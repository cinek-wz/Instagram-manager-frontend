import { Component, OnInit, ViewChild } from '@angular/core';
import { InstagramAccount, AccountQuery } from '../../../../Stores/Account/account.store';
import { AccountService } from './../../../../Stores/Account/account.service';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    constructor(
        private Router: Router,
        public AccountQuery: AccountQuery, 
        public AccountService: AccountService
    ) { }

    ngOnInit() { 
        this.AccountService.GetAccounts();
    }

    OpenAccount(ID: string)
    {
        this.AccountService.SetActive(ID);
        this.Router.navigate(['/account']);
    }
}
