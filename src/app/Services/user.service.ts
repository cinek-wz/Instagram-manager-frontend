import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { APIService } from './api.service';

import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class UserService 
{
    public isLoggedIn: BehaviorSubject<boolean>;

    //User details
    public Login: string;

    constructor(private ToastService: ToastrService, private router: Router, private API: APIService, private Translate: TranslateService) 
    { 
        this.isLoggedIn = new BehaviorSubject(undefined);
    }

    public GetUser()
    {
        this.API.GetProfile().subscribe((response: any) => 
        {
            this.Login = response.data.login;
            this.isLoggedIn.next(true);
        }, (error: HttpErrorResponse) => 
        {
            this.isLoggedIn.next(false);
        })
    }

    public SignIn(Login: string, Password: string)
    {
        this.API.Login(Login, Password).subscribe((response: any) => 
        {
            this.ToastService.success(this.Translate.instant('notifications.loggedin'));
            this.Login = response.data.login;
            this.isLoggedIn.next(true);
            this.router.navigate(['/dashboard']);
        });
    }

    public SignOut()
    {
        this.API.Logout().subscribe((response: any) => 
        {
            this.ToastService.success(this.Translate.instant('notifications.loggedout'));
            this.isLoggedIn.next(false);
            this.router.navigate(['/login']);
        });
    }
}
