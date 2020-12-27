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

    async GetTopPhotos(ID: number)
    {
        return new Promise<Object>(async (resolve,reject) => 
        {
            this.API.GetTopPhotos(ID).subscribe((response: any) => 
            {
                return resolve(response.data);
            }, (error: HttpErrorResponse) => 
            {
                this.ToastService.error(this.Translate.instant('notifications.internalerror'));
                return reject();
            });
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
        return new Promise<void>(async (resolve,reject) => 
        {
            this.API.AddSchedule(ID, Description, Date, Photo).subscribe((response: any) => 
            {
                this.ToastService.success(this.Translate.instant('notifications.scheduleadded'));
                return resolve();
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
                resolve(response.data);
            }, (error: HttpErrorResponse) => 
            {
                reject(error);
            });
        });
    }

    async DeleteSchedule(AccountID: number, ScheduleID)
    {
        return new Promise<void>(async (resolve,reject) => 
        {
            this.API.DeleteSchedule(AccountID, ScheduleID).subscribe((response: any) => 
            {
                this.ToastService.success(this.Translate.instant('notifications.scheduleremoved'));
                resolve();

            }, (error: HttpErrorResponse) => 
            {
                reject(error);
            });
        });
    }
}
