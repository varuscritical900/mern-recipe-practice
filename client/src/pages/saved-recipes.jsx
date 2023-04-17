import { useEffect, useState } from "react";
import {useGetUserID} from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () =>{
    const [savedRecipes, setSavedRecipes] = useState([]);

   const userID = useGetUserID();

    useEffect(() =>{
        const fetchSavedRecipe = async ()=>{
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
              } catch (err) {
                console.log(err);
              }
        };

        fetchSavedRecipe();
    }, []);





    return (
        <div>
            <h2>Saved Recipes</h2>
            <ul>
                {savedRecipes.map((recipe) =>(
                    <li key={recipe._id}>
                        <div>
                            <h2>{recipe.name}</h2>
                        </div>
                        <div className="instructions">
                            <p>
                                {recipe.instructions}
                            </p>
                        </div>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        
                        <p>Cooking time: {recipe.cookingTime} (minutes)</p>
                    </li>
                ))}
            </ul>
        </div>
        )
};