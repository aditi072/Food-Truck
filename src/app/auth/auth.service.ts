import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './user.model';
import { environment } from 'src/environments/environment.prod';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null); //storing authenticated user
    // Behavior subject - gives access to previous values also
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    signup(email: string, password: string) {
        return this.http.
            post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                }
            )
            .pipe(catchError(this.handleError),
                tap(resData => {            //tap - perform some action without changing response
                    this.handleAuthenticaton(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn,
                    );
                })
            );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
            .pipe(catchError(this.handleError),
                tap(resData => {
                    this.handleAuthenticaton(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn,
                    );
                })
            );
    }

    // to stay login on page reload(check if userData is still present in localstorage)
    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));  //parse - string to JS object
        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id, 
            userData._token, 
            new Date(userData._tokenExpirationDate)
        );
        

    if(loadedUser.token){
        this.user.next(loadedUser);
// For autoLogout we need to calculate the remaining time for token expiration
        const expirationDuration = 
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();   //getTime()-gives time in milisecond
        this.autoLogout(expirationDuration);
    }
}

    logout() {
        this.user.next(null);
        this.router.navigate(['./auth']);
        localStorage.removeItem('userData');  //clear the snapshot (.clear- to remove all the data)
//if we manually logout & timer keeps running it'll logout after a particular time again. Hence,
        if(this.tokenExpirationTimer){      //if timer is still running
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    // we need to call autoLogout whereever we emit a newuser to our application - handleAuthentication & autologin
    autoLogout(expirationDuration : number){
        console.log(expirationDuration);        //3600000 ms default(1 hr)
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);     //call logout after an expirationduration
    }

    private handleAuthenticaton(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);   //emitting new user
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));  //storing a snapshot upon login
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case "EMAIL_EXISTS":
                errorMessage = 'This email exists already';
                break;
            case "EMAIL_NOT_FOUND":
                errorMessage = 'This email does not exist';
                break;
            case "INVALID_PASSWORD":
                errorMessage = 'Incorrect password';
                break;
        }
        return throwError(errorMessage);
    }
}