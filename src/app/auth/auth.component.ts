import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "./auth.service";

@Component ({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    isLoading = false;
    error:string = null;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective//will find 1st occurence of directive in form & store in alerthost

    private closeSub: Subscription ;

    constructor(private authService: AuthService, 
                private router: Router,
                private componentFactoryResolver: ComponentFactoryResolver //for dynamic components
                ) { }

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){
        // console.log(form.value);
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        
        let authObs: Observable<AuthResponseData>;
        
        this.isLoading = true;
        if (this.isLoginMode) {
            authObs = this.authService.login(email, password);
        }
        else {
            authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(
            resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.showErrorAlert(errorMessage);
                this.isLoading = false;
            }
        );
        form.reset();
    }

    onHandleError(){
        this.error = null;
    }

    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }

    private showErrorAlert(message: string){
        // const alertcmp = new AlertComponent();
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
            AlertComponent
        ); // an object that knows howto create a component
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear(); //clears all components that have been rendered in tht place b4.

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe( ()=> {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear(); //to clear all rendered-content
        });
    }
}