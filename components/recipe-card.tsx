import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

type Props = {
    recipeHTML: string,
    recipeImage: string,
    recipeName: string,
}

export default function RecipeCard(props: Props) {
    function handleOnClick() {
        navigator.clipboard.writeText(props.recipeHTML)
            .then(() => {
                console.log('Copied to clipboard');
            })
            .catch(err => {
                console.log('Error copying to clipboard: ', err);
            });
    }

    return (

        <Card raised sx={{maxWidth: 500}} className="recipe-card">
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.recipeName}
                </Typography>
                    <div dangerouslySetInnerHTML={{__html: props.recipeHTML}}/>
            </CardContent>
            <CardActions className="recipe-actions">
                <Button onClick={handleOnClick} variant="outlined" size="small">Copy</Button>
            </CardActions>
        </Card>
    );
}
