// Includes multiple services/Interceptors of app module, which are together returned as a core module to app component.
// instead using this use @Injectable({providedIn: 'root'}) in the services.
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";

@NgModule ({
    providers: [
        ShoppingListService, 
        RecipeService, 
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService,
      multi: true
    }
    ]
})
export class CoreModule {}