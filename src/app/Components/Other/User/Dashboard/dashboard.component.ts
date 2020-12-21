import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { APIService } from 'src/app/Services/api.service';
import { DataService } from 'src/app/Services/data.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit 
{
    constructor(private ToastService: ToastrService, private API: APIService, public DataService: DataService, private Translate: TranslateService) { }

    ngOnInit() 
    {
        this.GetAccounts();
    }

    GetAccounts()
    {
        this.API.GetInstagramAccounts().subscribe((response: any) => 
        {
            this.DataService.Accounts = response.data;
        }, (error: HttpErrorResponse) => 
        {
            this.ToastService.error(this.Translate.instant('notifications.internalerror'));
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
}
