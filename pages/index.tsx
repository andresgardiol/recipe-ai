import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Autocomplete, Button, CircularProgress, Fab, Grid, TextField} from "@mui/material";
import React, {useRef} from "react";
import RecipeService, {MeasureSystem, PromptLanguage} from "../services/recipe-service";
import RecipeCard from "../components/recipe-card";
import {Box} from "@mui/system";
import LanguageSelect from "../components/language-select";
import MeasureSystemSelect from "../components/measure-system-select";

const recipeService = new RecipeService();

export default function Home() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [meal, setMeal] = React.useState('');
    const [recipe, setRecipe] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        setRecipe('');
        setIsLoading(true);
        event.preventDefault();
        const meal = inputRef.current!.value;
        setMeal(meal);
        console.log("Selected meal: " + meal);
        const prompt = recipeService.createRecipePrompt(meal);
        const recipe = await recipeService.getRecipe(prompt);
        console.log("Recipe: " + recipe);
        setRecipe(recipe);
        setIsLoading(false);
    }

    const handleLanguageChange = (lan: string) => {
        recipeService.changeLanguage(lan as PromptLanguage);
    }

    const handleMeasureSystemChange = (system: string) => {
        recipeService.changeMeasureSystem(system as MeasureSystem);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>AI Recipes</title>
                <meta name="description" content="Search for recipes using AI"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Grid container className="options" direction="row" alignItems="center" justifyContent="center">
                <Grid item xs={6} md={4} lg={2} className="option-item">
                    <LanguageSelect onLanguageChange={handleLanguageChange}/>
                </Grid>
                <Grid item xs={6} md={4} lg={2} className="option-item">
                    <MeasureSystemSelect onMeasureSystemChange={handleMeasureSystemChange}/>
                </Grid>
            </Grid>

            <main className={styles.main}>
                <Grid className={recipe? '' : styles.maingrid} container direction="column" alignItems="center" justifyContent="flex-start">

                    <Grid item>
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
                                        label="Type to start searching"/>}
                            />
                            <Button className="submit-meal" type="submit" variant="contained">Get Recipe</Button>
                        </form>

                    </Grid>
                    <Grid item xs={2}>

                        {recipe && <RecipeCard recipeHTML={recipe} recipeImage={'pepe'} recipeName={meal}/>}

                        {(!recipe && isLoading) && (
                            <Box sx={{display: 'flex'}}>
                                <CircularProgress/>
                            </Box>
                        )}

                        {(!recipe && !isLoading) && (
                            <Box sx={{display: 'flex'}}>
                                <h3>Search for a recipe to start </h3>
                            </Box>
                        )}

                    </Grid>
                </Grid>
            </main>
        </div>
    )
}

