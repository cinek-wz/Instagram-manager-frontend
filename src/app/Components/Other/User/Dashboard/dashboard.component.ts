import { AccountService } from './../../../../Stores/Account/account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Account, AccountQuery } from '../../../../Stores/Account/account.store';

import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    accounts$: Observable<Account[]>;
    isloading$: Observable<boolean>;

    constructor(
        private Translate: TranslateService, 
        private AccountQuery: AccountQuery, 
        public AccountService: AccountService
    ) { }

    ngOnInit() { 
        this.accounts$ = this.AccountQuery.selectAll();
        this.isloading$ = this.AccountQuery.selectLoading();
        
        this.AccountService.getAccounts();
    }
}
