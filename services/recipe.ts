export default class RecipeService {
    meals = [
        {label: 'Pizza', id: 1},
        {label: 'Burger', id: 2},
        {label: 'Risotto', id: 3},
        {label: 'Pasta', id: 4},
        {label: 'Salad', id: 5},
        {label: 'Sandwich', id: 6},
        {label: 'Soup', id: 7},
        {label: 'Steak', id: 8},
        {label: 'Tacos', id: 9},
        {label: 'Tofu', id: 10},
        {label: 'Tortilla', id: 11},
        {label: 'Waffles', id: 12},
        {label: 'French Fries', id: 13},
    ];

    async getRecipe(prompt: string): Promise<string> {
        const response = await fetch(`http://localhost:5001/api/chat?prompt=${prompt}`);
        let res = response.text();
        console.log(res);
        return res;
    }

    getMeals() {
        return this.meals;
    }

    createRecipePrompt(meal: string): string {
        const prompt = promptSettings.promptTemplate.replace('%food%', meal).replace('%measure%', promptSettings.measureSystem);
        return prompt;
    }
}

const promptSettings = {
    promptTemplate: 'Write a recipe for: %food%. Put a title at the top. Then, list the ingredients first and then the steps. If any, include notes at the bottom. No greetings, goodbyes or introductory text. Use %measure% system. Friendly tone.',
    measureSystem: 'metric',
}
