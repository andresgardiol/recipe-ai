import '../styles/globals.css'
import type { AppProps } from 'next/app'
import RecipeService from "../services/recipe-service";

const recipeService = new RecipeService();

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
