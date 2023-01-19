import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule} from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';


@NgModule({
  declarations: [ AppComponent, HeaderComponent,
    // AuthComponent,
    // RecipesComponent,
    // RecipeListComponent,
    // RecipeDetailComponent,
    // RecipeItemComponent,
    // RecipeStartComponent,
    // RecipeEditComponent,
    // ShoppingListComponent,
    // ShoppingEditComponent,
    // DropdownDirective,
    // LoadingSpinnerComponent,
    // AlertComponent,
    // PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // RecipesModule
    // ShoppingListModule,
    // AuthModule,
    SharedModule,
    CoreModule
  ],
  providers: [
    // ShoppingListService, 
    // RecipeService, 
    // {
    //   provide: HTTP_INTERCEPTORS, 
    //   useClass: AuthInterceptorService,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// Types of Module: 
// Feature(Auth, recipe, shoppping-list)
// Shared, Core
