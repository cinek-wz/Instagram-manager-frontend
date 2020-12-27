import { Injectable } from '@angular/core';
import { AccountStore } from './account.store';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccountService 
{
    constructor(private AccountStore: AccountStore) {}

    getBooks() 
    {
        //rest api
    }
}
