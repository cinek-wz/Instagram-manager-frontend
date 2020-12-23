import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { APIService } from './api.service';

import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class InstagramService 
{
    constructor(private ToastService: ToastrService, private Translate: TranslateService, private API: APIService, public DataService: DataService) { }

    async GetAccounts()
    {
        return new Promise<void>((resolve, reject) => 
        {
            this.API.GetInstagramAccounts().subscribe((response: any) => 
            {
                this.DataService.Accounts = response.data;
                return resolve();
            }, (error: HttpErrorResponse) => 
            {
                this.ToastService.error(this.Translate.instant('notifications.internalerror'));
                return reject();
            });
        });
    }

    DeleteAccount(ID: number)
    {
        this.API.DeleteInstagramAccount(ID).subscribe((response: any) => 
        {
            this.ToastService.success(this.Translate.instant('notifications.accountdeleted'));
            this.GetAccounts();
        }, (error: HttpErrorResponse) => 
        {
            this.ToastService.error(this.Translate.instant('notifications.internalerror'));
        });
    }

    ChangeAccountStatus(ID: number, Status: boolean)
    {
        this.API.ChangeInstagramAccountStatus(ID, Status).subscribe((response: any) => 
        {
            this.ToastService.success(this.Translate.instant('notifications.accountstatuschanged'));
            this.GetAccounts();
        }, (error: HttpErrorResponse) => 
        {
            this.ToastService.error(this.Translate.instant('notifications.internalerror'));
        });
    }

    async GetTopPhotos(ID: number)
    {
        return new Promise<Object>(async (resolve,reject) => 
        {
            let Index = this.DataService.Accounts.findIndex((x) => x.id == ID);

            if(this.DataService.Accounts[Index].topphotos == null)
            {
                this.API.GetTopPhotos(ID).subscribe((response: any) => 
                {
                    let TopPhotos = this.DataService.Accounts[Index].topphotos = response.data;
                    return resolve(TopPhotos);
                }, (error: HttpErrorResponse) => 
                {
                    this.ToastService.error(this.Translate.instant('notifications.internalerror'));
                    return reject();
                });
            }
            else
            {
                return resolve(this.DataService.Accounts[Index].topphotos);
            }
        });
    }

    async GetSimilarTags(ID: number, Tag: string)
    {
        return new Promise<Object>(async (resolve,reject) => 
        {
            this.API.GetSimilarTags(ID, Tag).subscribe((response: any) => 
            {
                return resolve(response.data);
            }, (error: HttpErrorResponse) => 
            {
                this.ToastService.error(this.Translate.instant('notifications.internalerror'));
                return reject();
            });
        });
    }

    async GetInsights(ID: number)
    {
        return new Promise<Object>(async (resolve,reject) => 
        {
            this.API.GetInsights(ID).subscribe((response: any) => 
            {
                return resolve(response.data);
            }, (error: HttpErrorResponse) => 
            {
                return reject(error);
            });
        });
    }

    async AddSchedule(ID: number, Description: string, Date: string, Photo: File)
    {
        return new Promise<Object>(async (resolve,reject) => 
        {
            this.API.AddSchedule(ID, Description, Date, Photo).subscribe((response: any) => 
            {
                this.ToastService.success(this.Translate.instant('notifications.scheduleadded'));
                return resolve(response.data);
            }, (error: HttpErrorResponse) => 
            {
                return reject(error);
            });
        });
    }

    async GetSchedules(ID: number)
    {
        return new Promise<Object>(async (resolve,reject) => 
        {
            this.API.GetSchedule(ID).subscribe((response: any) => 
            {
                return resolve(response.data);
            }, (error: HttpErrorResponse) => 
            {
                return reject(error);
            });
        });
    }

    async DeleteSchedule(ID: number)
    {

    }
}
