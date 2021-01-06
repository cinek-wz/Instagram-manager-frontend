import { Component, OnInit } from '@angular/core';

import { InstagramAccount, AccountQuery } from '../../../../Stores/Account/account.store';
import { AccountService } from './../../../../Stores/Account/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit 
{
    public Account: InstagramAccount;

    constructor(
        public AccountQuery: AccountQuery,
        public AccountService: AccountService
    ) { }

    async ngOnInit() {}

}
