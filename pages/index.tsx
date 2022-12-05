import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Autocomplete, Button, TextField} from "@mui/material";
import React, {useRef} from "react";
import RecipeService from "../services/recipe";
import RecipeCard from "../components/recipe-card";

const recipeService = new RecipeService();

export default function Home() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [recipe, setRecipe] = React.useState<string>('');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        setRecipe('');
        event.preventDefault();
        const meal = inputRef.current!.value;
        console.log("Selected meal: " + meal);
        const prompt = recipeService.createRecipePrompt(meal);
        const recipe = await recipeService.getRecipe(prompt);
        console.log("Recipe: " + recipe);
        setRecipe(recipe);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>AI Recipes</title>
                <meta name="description" content="Search for recipes using AI"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h2>Search for a food recipe:</h2>

                <form onSubmit={handleSubmit} className="meal-form">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={recipeService.getMeals()}
                        sx={{width: 300}}
                        renderInput={(params) =>
                            <TextField
                                name="meal"
                                type="text"
                                inputRef={inputRef}
                                required
                                {...params}
                                label="Type to start searching..."/>}
                    />

                    <Button type="submit" variant="contained">Get a Recipe</Button>
                </form>
                {recipe && <RecipeCard recipeHTML={recipe} recipeImage={'pepe'} recipeName={inputRef.current!.value}/>}
            </main>
        </div>
    )
}

