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
        const baseURL = `http://localhost:5001/api/chat`;
        const response = await fetch(`${baseURL}?prompt=${prompt}`);
        let res = response.text();
        console.log(res);
        return res;
    }

    getMeals() {
        return this.meals;
    }

    createRecipePrompt(meal: string): string {
        let promptTemplate: string;
        if (promptSettings.language === 'english') {
            promptTemplate = promptSettings.promptTemplate.english;
        } else {
            promptTemplate = promptSettings.promptTemplate.spanish;
        }
        return promptTemplate.replace('%food%', meal).replace('%measure%', promptSettings.measureSystem);
    }

    changeMeasureSystem(system: MeasureSystem) {
        promptSettings.measureSystem = system;
    }

    changeLanguage(language: PromptLanguage) {
        promptSettings.language = language;
    }
}
export type PromptLanguage = 'english' | 'spanish';
export type MeasureSystem = 'metric' | 'imperial';

const promptSettings = {
    promptTemplate: {
        english: 'Write a recipe for: %food%. Put a title at the top. Then, list the ingredients first and then the steps. If any, include notes at the bottom. No greetings, goodbyes or introductory text. Use %measure% system. Friendly tone.',
        spanish: 'Escribe una receta para: %food%. Pon un título arriba. Luego, lista los ingredientes primero y luego los pasos. Si es necesario, incluye notas al final. Sin saludos, despedidas o texto introductorio. Usa el sistema %measure%. Tono amigable.',
    },
    measureSystem: 'metric',
    language: 'english'
};
