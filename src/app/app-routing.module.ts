import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  //lazy loading
  { 
    path: 'recipes',
    loadChildren: () => import('./recipes/recipes.module').then(x => x.RecipesModule)
  },  
  { 
    path: 'shopping-list',
    loadChildren: () => import('./shopping-list/shopping-list.module').then(x => x.ShoppingListModule)
  },  
  { 
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)
  },  
 
  // { 
  //   path: 'recipes', 
  //   component: RecipesComponent,
  //   canActivate: [AuthGuard], 
  //   children:[
  //   {path: '', component: RecipeStartComponent},
  //   {path: 'new', component: RecipeEditComponent},
  //   {
  //           path: ':id', 
  //           component: RecipeDetailComponent, 
  //           resolve: [RecipesResolverService]
  //   },
  //   {path: ':id/edit', 
  //           component: RecipeEditComponent, 
  //           resolve: [RecipesResolverService]}
  // ]},
  // { path: 'shopping-list', component: ShoppingListComponent},
  // { path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy:PreloadAllModules})], //to preload lazy loading modules to optimize speed
  exports: [RouterModule]
})
export class AppRoutingModule { }
