import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import RecipeList from "./RecipeList";
import "../css/app.css";
import RecipeEdit from "./RecipeEdit";

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = "cookingWithReact.recipes";

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(sampleRecipes);
  const selectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipeId
  );

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange,
  };

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }

  function handleRecipeAdd() {
    // console.log(uuidv4());
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [{ id: uuidv4(), name: "", amount: "" }],
    };
    // console.log(newRecipe);
    setSelectedRecipeId(newRecipe.id);
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeChange(id, recipe) {
    console.log(id, recipe);
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex((r) => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "1:45",
    instructions:
      "1. Put salt on chicken \n 2. Put chicken in oven  \n 3.Eat chicken",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs",
      },
    ],
  },
  {
    id: 2,
    name: "Plain Beef",
    servings: 3,
    cookTime: "2:45",
    instructions: "1. Put parika on beef \n2.Put beef in oven  \n3.Eat Beef",
    ingredients: [
      {
        id: 1,
        name: "Beef",
        amount: "2 Pounds",
      },
      {
        id: 2,
        name: "Paprika",
        amount: "2 Tbs",
      },
    ],
  },
];

export default App;
