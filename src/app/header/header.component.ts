import { Component, OnDestroy, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    isAuthenticated = false;
    private userSub: Subscription;

    constructor(private dataStorageService: DataStorageService,
                private authService: AuthService){}

    onSaveData(){
        this.dataStorageService.storeRecipes();
        alert('Data Stored!');
    }
    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }

    ngOnInit(){
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !user ? false : true;  //  !!user
        });
    }

    onLogout(){
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}