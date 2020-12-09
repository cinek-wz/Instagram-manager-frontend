import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, delay } from 'rxjs/operators';

import { UserService } from './../Services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate 
{
    constructor(private UserService: UserService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
        return this.UserService.isLoggedIn.pipe(filter(item => item != undefined)).pipe(map((res: boolean) => 
        {
            if(res == true)
            {
                return true;
            }
            else
            {
                this.router.navigate(['/login']);
                return false;
            }
        }));
    }
}
