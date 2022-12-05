import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";

type Props = {
    recipeHTML: string,
    recipeImage: string,
    recipeName: string,
}

export default function RecipeCard(props: Props) {
    return (

        <Card sx={{maxWidth: 345}}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.recipeName}
                </Typography>
                    <div dangerouslySetInnerHTML={{__html: props.recipeHTML}}/>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}
