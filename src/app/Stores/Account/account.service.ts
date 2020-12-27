import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Account, AccountStore, AccountQuery } from './account.store';
import { APIService } from '../../Services/api.service';

@Injectable({ providedIn: 'root' })
export class AccountService 
{
    constructor(
        private API: APIService, 
        private Store: AccountStore,
        private AccountQuery: AccountQuery,
    ) {}

    getAccounts()
    {
        console.log(`API CALL`);
        if (!this.AccountQuery.getHasCache())
        {
            console.log(`API CALL2`);

            this.API.GetInstagramAccounts().subscribe((response: any) => {
                let Accounts = response.data;
                this.Store.set(Accounts);
            }, (error: HttpErrorResponse) => 
            {
                console.log(error);
                // this.ToastService.error(this.Translate.instant('notifications.internalerror'));
            });
        }
    }

    ModifyAccount(Account: Account)
    {
        this.Store.update(Account.id, {
            enabled: !Account.enabled
        });
    }

    DeleteAccount(Account: Account)
    {
        this.Store.remove(Account.id);
    }
}
