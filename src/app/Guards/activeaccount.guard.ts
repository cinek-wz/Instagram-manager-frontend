import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, delay } from 'rxjs/operators';

import { UserService } from './../Services/user.service';
import { InstagramAccount, AccountQuery } from '../Stores/Account/account.store';


@Injectable({
  providedIn: 'root'
})
export class ActiveAccountGuard implements CanActivate 
{
    constructor(
        private UserService: UserService, 
        public AccountQuery: AccountQuery, 
        private router: Router
    ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
        if(this.AccountQuery.hasActive())
        {
            return true;
        }
        else
        {
            this.router.navigate(['/dashboard']);
            return false;
        }
        
    }
}
