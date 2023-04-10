import axios from 'axios';
import {useState} from 'react';
import { useGetUserID } from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';

export const CreateRecipe = () =>{
    const userID = useGetUserID();
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });

    const navigate = useNavigate();

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value});
    }

    const handleIngredientChange = (event, idx) =>{
        const {value} = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe, ingredients});
        console.log(recipe);
    }

    const addIngredient = () =>{
        setRecipe({...recipe, ingredients: [...recipe.ingredients,""]});
    }

    const onSubmit = async (event)=>{
        event.preventDefault();
        try{
            await axios.post("http://localhost:3001/recipes", recipe);
            alert("Recipe Created");
            navigate("/");
        }catch(err){
            console.error(err);
        }
    }

    return (
    <div className="create-recipe">
        <h2>Create Recipe</h2>
        <form onSubmit={onSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={handleChange}/>
            <label htmlFor="ingredients">Ingredients</label>
            <button onClick={addIngredient} type="button">Add Ingredient</button>
            {recipe.ingredients.map((ingredients, idx) =>(
                <input key={idx} type="text" name="ingredients" value={ingredients} onChange={(event) => handleIngredientChange(event, idx)}/>
            ))}

            <label htmlFor="instructions">Instructions</label>
            <textarea name="instructions" id="instructions" onChange={handleChange}></textarea>

            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange}/>

            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}/>

            <button type="submit">Create Recipe</button>
        </form>
    </div>
    );
};