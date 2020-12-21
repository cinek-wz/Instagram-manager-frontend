import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { APIService } from './api.service';
import { InstagramService } from 'src/app/Services/instagram.service';

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
    public Email: string;

    constructor(private ToastService: ToastrService, private router: Router, public InstagramService: InstagramService, private API: APIService, private Translate: TranslateService) 
    { 
        this.isLoggedIn = new BehaviorSubject(undefined);
    }

    public GetUser()
    {
        this.API.GetProfile().subscribe(async (response: any) => 
        {
            this.Login = response.data.login;
            this.Email = response.data.email;
            await this.InstagramService.GetAccounts();
            this.isLoggedIn.next(true);
        }, (error: HttpErrorResponse) => 
        {
            this.isLoggedIn.next(false);
        })
    }

    public SignIn(Login: string, Password: string)
    {
        this.API.Login(Login, Password).subscribe(async (response: any) => 
        {
            this.ToastService.success(this.Translate.instant('notifications.loggedin'));
            this.Login = response.data.login;
            this.Email = response.data.email;
            await this.InstagramService.GetAccounts();
            this.isLoggedIn.next(true);
            this.router.navigate(['/dashboard']);
        });
    }

    public ModifyProfile(Email: string)
    {
        return this.API.ModifyProfile(Email).subscribe((response: any) => 
        {
            this.Email = Email;
            this.ToastService.success(this.Translate.instant('notifications.settingssaved'));
        }, (error: HttpErrorResponse) => 
        {
            this.ToastService.error(this.Translate.instant('notifications.internalerror'));
            return false;
        });
    }

    public Register(Login: string, Email: string, Password: string)
    {
        this.API.Register(Login, Email, Password).subscribe((response: any) => 
        {
            this.ToastService.success(this.Translate.instant('notifications.registered'));
            this.router.navigate(['/login']);
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
