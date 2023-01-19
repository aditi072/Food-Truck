import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
//This file is made to avoid error after reloading page on recipes/2 coz the data is cleared on reloading.
// To Avoid loss of data on reloading.
@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorageService: DataStorageService,
                private recipesService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
//once data is there resolver will subscribe to fetchrequest.
        const recipes = this.recipesService.getRecipes();

//if recipes are fetched everytime on reloading the same page. changes will not be updated hence only fetch from server when length=0 else from recipeservice.
        if(recipes.length === 0){
            // there are no recipes we should fetch them
            return this.dataStorageService.fetchRecipes();
        } else{
            return recipes;
        }
    }
}