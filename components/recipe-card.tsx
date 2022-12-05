import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

type Props = {
    recipeHTML: string,
    recipeImage: string,
    recipeName: string,
}

export default function RecipeCard(props: Props) {
    return (
        <>
            <h1>{props.recipeName}</h1>
            <div dangerouslySetInnerHTML={{ __html: props.recipeHTML }} />
        </>
    );
}
