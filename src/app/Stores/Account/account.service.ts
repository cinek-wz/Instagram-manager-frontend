import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { InstagramAccount, AccountStore, AccountQuery, InstagramTopPhoto, InstagramSchedule } from './account.store';
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

    // Set active account
    SetActive(AccountID: string)
    {
        this.Store.setActive(AccountID);
    }

    async GetTopPhotos()
    {
        let Account = this.AccountQuery.getActive();

        try
        {
            let Response: any = await this.API.GetTopPhotos(Account.id).toPromise();

            let Photos: Array<InstagramTopPhoto> = Response.data;
            this.Store.update(Account.id, {
                topphotos: Photos
            });
        }
        catch (Error)
        {
            console.error(Error);
        }
    }

    async GetInsights()
    {
        let Account = this.AccountQuery.getActive();

        try
        {
            let Response: any = await this.API.GetInsights(Account.id).toPromise();
            let Insights = Response.data;

            this.Store.update(Account.id, {
               insights: Insights
            });
            return Insights;
        }
        catch (Error)
        {
            console.error(Error);
        }
    }

    async GetSimilarTags(Tag: string)
    {
        let Account = this.AccountQuery.getActive();

        try
        {
            let Response: any = await this.API.GetSimilarTags(Account.id, Tag).toPromise();
            return Response.data;
        }
        catch (Error)
        {
            console.error(Error);
            // this.ToastService.error(this.Translate.instant('notifications.internalerror'));
        }
    }

    async GetSchedules()
    {
        let Account = this.AccountQuery.getActive();

        try
        {
            let Response: any = await this.API.GetSchedule(Account.id).toPromise();
            let Schedules = Response.data;

            this.Store.update(Account.id, {
                schedules: Schedules
            });
        }
        catch (Error)
        {
            console.error(Error);
        }
    }

    async AddSchedule(Description: string, Date: string, Photo: File)
    {
        let Account = this.AccountQuery.getActive();

        try
        {
            await this.API.AddSchedule(Account.id, Description, Date, Photo).toPromise();

            await this.GetSchedules();

            // this.ToastService.success(this.Translate.instant('notifications.scheduleadded'));
        }
        catch (Error)
        {
            console.error(Error);
        }
    }

    async DeleteSchedule(ScheduleID: number)
    {
        let Account = this.AccountQuery.getActive();

        try
        {
            await this.API.DeleteSchedule(Account.id, ScheduleID).toPromise();

            this.Store.update(Account.id, {
                schedules: Account.schedules.filter((value: InstagramSchedule) => value.id != ScheduleID)
            });

            // this.ToastService.success(this.Translate.instant('notifications.scheduleremoved'));
        }
        catch (Error)
        {
            console.error(Error);
        }
    }

    async GetAccounts()
    {
        if (!this.AccountQuery.getHasCache())
        {
            try
            {
                let Response: any = await this.API.GetInstagramAccounts().toPromise();

                let Accounts = Response.data;
                this.Store.set(Accounts);
            }
            catch (Error)
            {
                console.error(Error);
            }
        }
    }

    async ModifyAccount(Account: InstagramAccount)
    {
        try
        {
            await this.API.ChangeInstagramAccountStatus(Account.id, !Account.enabled).toPromise();
            
            this.Store.update(Account.id, {
                enabled: !Account.enabled
            });
        }
        catch (Error)
        {
            console.error(Error);
        }
    }

    async DeleteAccount(Account: InstagramAccount)
    {
        try
        {
            await this.API.DeleteInstagramAccount(Account.id).toPromise();

            this.Store.remove(Account.id);
        }
        catch (Error)
        {
            console.error(Error);
        }
    }

    async AddAccount(Login: string, Password: string)
    {
        try
        {
            await this.API.AddInstagramAccount(Login, Password).toPromise();

            this.Store.setHasCache(false);
            await this.GetAccounts();
        }
        catch (Error)
        {
            console.error(Error);
        }
    }
}
