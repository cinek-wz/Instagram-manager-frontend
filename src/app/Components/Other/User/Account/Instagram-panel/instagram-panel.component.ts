import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstagramAccount, AccountQuery } from '../../../../../Stores/Account/account.store';

import { InstagramService } from 'src/app/Services/instagram.service';
import { AccountService } from './../../../../../Stores/Account/account.service';

@Component({
  selector: 'app-instagram-panel',
  templateUrl: './instagram-panel.component.html',
  styleUrls: ['./instagram-panel.component.scss']
})
export class InstagramPanelComponent implements OnInit 
{
    public Account: InstagramAccount;
    public AccountMonthlyGain;
    public AccountDailyGain;
    public AccountCurrentFollowers;

    constructor(
        private route: ActivatedRoute, 
        public InstagramService: InstagramService,
        public AccountQuery: AccountQuery, 
        public AccountService: AccountService
    ) { }

    async ngOnInit()
    {
        this.AccountQuery.account$.subscribe((Account) => 
        {
            this.Account = Account;
            this.AccountCurrentFollowers = this.Account.currentfollowers;
            this.AccountMonthlyGain = this.AccountCurrentFollowers - this.Account.monthfollowers;
            this.AccountDailyGain = this.AccountCurrentFollowers - this.Account.dayfollowers;
        });

        /*if (this.Account.topphotos == null)
        {
            this.TopPhotos = await this.InstagramService.GetTopPhotos(this.Account.id);
            this.Account.topphotos = this.TopPhotos;
        }*/
    }

    ConvertToDate(Time: number)
    {
        let Text = new Date(Time * 1000);
        return Text.toLocaleString();
    }

}
