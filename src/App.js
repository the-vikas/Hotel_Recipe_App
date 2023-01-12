import React, { useState} from "react";
import Recipe from "./Component/Recipe";
import './App.css';

function App() {

  const APP_ID = 'bad80449'
  const APP_KEY = 'bef08c1ca330f0fc40a35cb7ae7908e3';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');

  // useEffect(() => {
  //   getRecipe();
  // }, []);

  const getRecipe = async (e) => {
    
    e.preventDefault();
    const API_Req = "https://api.edamam.com/search?q=" + search + "&app_id=" + APP_ID + "&app_key=" + APP_KEY;
    const apiData = await fetch(API_Req)
    const data = await apiData.json();
    setRecipes(data.hits);
    // console.log(data);
    // console.log(search);
  }

  const searchRequest = (e) => {
    setSearch(e.target.value);
  }


  return (
    <div className="App">
      <form className="search-form" onSubmit={getRecipe}>
        <input className="search-bar" type="text" value={search} onChange={searchRequest}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
         calories={recipe.recipe.calories} 
         image={recipe.recipe.image}
         ingredients={recipe.recipe.ingredients}
         />
      ))}
      </div>
    </div>
  );
}

export default App;
