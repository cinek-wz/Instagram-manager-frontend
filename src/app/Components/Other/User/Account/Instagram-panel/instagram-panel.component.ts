import { Component, OnInit } from '@angular/core';

import { InstagramAccount, AccountQuery, InstagramTopPhoto } from '../../../../../Stores/Account/account.store';
import { AccountService } from './../../../../../Stores/Account/account.service';

@Component({
  selector: 'app-instagram-panel',
  templateUrl: './instagram-panel.component.html',
  styleUrls: ['./instagram-panel.component.scss']
})
export class InstagramPanelComponent implements OnInit
{
    public Account: InstagramAccount;

    constructor(
        public AccountQuery: AccountQuery, 
        public AccountService: AccountService
    ) { }

    async ngOnInit()
    {
        this.Account = this.AccountQuery.getActive();

        if (this.Account.topphotos == null)
        {
            await this.AccountService.GetTopPhotos();
        }
    }

    ConvertToDate(Time: number)
    {
        let Text = new Date(Time * 1000);
        return Text.toLocaleString();
    }

}
