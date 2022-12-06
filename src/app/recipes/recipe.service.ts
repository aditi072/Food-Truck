import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
recipeSelected = new EventEmitter<Recipe>();
recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [] = [
  //       new Recipe(
  //         'Margherita Pizza',
  //         'A Cheesy Crunchy Delight',
  //         'https://previews.123rf.com/images/mizina/mizina1704/mizina170400133/76090138-people-hand-taking-slice-of-pizza-margherita-pizza-margarita-and-child-hand-close-up-.jpg',
  //       [
  //         new Ingredient('Meat', 1),
  //         new Ingredient('French Fries',20)
  //       ]),
  //       new Recipe(
  //         'Another Test Recipe',
  //         'This is simply a test',
  //         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfWGjaMZpwdAFZm-Ydg8BlYvECXrQd8nfX89UEGhV7NNIv22tcMr_TVI_DEvPQe2TF_4k&usqp=CAU',
  //         [
  //           new Ingredient('Buns', 2),
  //           new Ingredient('Meat', 1)
  //         ])
  //     ];
    private recipes : Recipe[]= [];

      constructor(private slService: ShoppingListService) {
      }

      setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }
      
      getRecipes(){
        return this.recipes.slice();
      }

      getRecipe(index: number) {
        return this.recipes[index];
      }
      
      addIngredientsToShoppingList(ingredients : Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe:Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index]= newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index:number) {
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
}