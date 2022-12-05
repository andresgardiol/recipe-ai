export default class RecipeService {
    meals = [
        { label: "Pizza", id: 1 },
        { label: "Sushi", id: 2 },
        { label: "Hamburguesa", id: 3 },
        { label: "Tacos", id: 4 },
        { label: "Ramen", id: 5 },
        { label: "Falafel", id: 6 },
        { label: "Paella", id: 7 },
        { label: "Kebab", id: 8 },
        { label: "Dim sum", id: 9 },
        { label: "Espaguetis", id: 10 },
        { label: "Arroz frito", id: 11 },
        { label: "Bao bao", id: 12 },
        { label: "Nuggets de pollo", id: 13 },
        { label: "Churros", id: 14 },
        { label: "Curry", id: 15 },
        { label: "Borscht", id: 16 },
        { label: "Lasaña", id: 17 },
        { label: "Sopa de fideos", id: 18 },
        { label: "Sopa de tomate", id: 19 },
        { label: "Hamburguesa vegetariana", id: 20 },
        { label: "Galletas de avena", id: 21 },
        { label: "Panqueques", id: 22 },
        { label: "Pozole", id: 23 },
        { label: "Mole", id: 24 },
        { label: "Chocolate caliente", id: 25 },
        { label: "Enchiladas", id: 26 },
        { label: "Croquetas", id: 27 },
        { label: "Papas fritas", id: 28 },
        { label: "Cazuela", id: 29 },
        { label: "Bife de lomo", id: 30 },
        { label: "Empanadas", id: 31 },
        { label: "Tortillas de maíz", id: 32 },
        { label: "Tandoori chicken", id: 33 },
        { label: "Sopa de pollo", id: 34 },
        { label: "Sopa de pescado", id: 35 },
        { label: "Sopa de marisco", id: 36 },
        { label: "Crema de zanahoria", id: 37 },
        { label: "Crema de espinacas", id: 38 },
        { label: "Gazpacho", id: 39 },
        { label: "Fondue", id: 40 },
        { label: "Bagel", id: 41 },
        { label: "Eggs Benedict", id: 42 },
        { label: "Crepes", id: 43 },
        { label: "Huevos revueltos", id: 44 },
        { label: "Porridge", id: 45 },
        { label: "Toast", id: 46 },
        { label: "Bagel con queso crema", id: 47 },
        { label: "Sandwich de mantequilla de maní y mermelada", id: 48 },
        { label: "Borscht vegetariano", id: 49 },
        { label: "Hummus", id: 50 }
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
