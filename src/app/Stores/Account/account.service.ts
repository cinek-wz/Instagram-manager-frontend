import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { InstagramAccount, AccountStore, AccountQuery, InstagramTopPhoto } from './account.store';
import { APIService } from '../../Services/api.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AccountService 
{
    constructor(
        private Router: Router, 
        private API: APIService, 
        private Store: AccountStore,
        private AccountQuery: AccountQuery,
    ) {}

    async GetAccounts(): Promise<void>
    {
        return new Promise<void>((resolve, reject) => 
        {
            if (!this.AccountQuery.getHasCache())
            {
                this.API.GetInstagramAccounts().subscribe((response: any) => {
                    let Accounts = response.data;
                    this.Store.set(Accounts);
                    return resolve();
                }, (error: HttpErrorResponse) => 
                {
                    console.log(error);
                    return reject();
                    // this.ToastService.error(this.Translate.instant('notifications.internalerror'));
                });
            }
            else
            {
                return resolve();
            }
        });
    }

    SetActive(AccountID: string)
    {
        this.Store.setActive(AccountID);
    }

    SetTopPhotos(Account: InstagramAccount, Photos: Array<InstagramTopPhoto>)
    {
        this.Store.update(Account.id, {
            topphotos: Photos
        });
    }

    ModifyAccount(Account: InstagramAccount)
    {
        this.API.ChangeInstagramAccountStatus(Account.id, !Account.enabled).subscribe((response: any) => 
        {
            this.Store.update(Account.id, {
                enabled: !Account.enabled
            });
        }, (error: HttpErrorResponse) => 
        {
            console.log(error);
            // this.ToastService.error(this.Translate.instant('notifications.internalerror'));
        });
    }

    DeleteAccount(Account: InstagramAccount)
    {
        this.Store.remove(Account.id);
    }
}
