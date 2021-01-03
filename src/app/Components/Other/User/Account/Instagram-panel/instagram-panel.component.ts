import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstagramAccount, AccountQuery, InstagramTopPhoto } from '../../../../../Stores/Account/account.store';

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

    constructor(
        public InstagramService: InstagramService,
        public AccountQuery: AccountQuery, 
        public AccountService: AccountService
    ) { }

    async ngOnInit()
    {
        this.Account = this.AccountQuery.getActive();


        if (this.Account.topphotos == null)
        {
            let TopPhotos: Array<InstagramTopPhoto> = await this.InstagramService.GetTopPhotos(this.Account.id);
            this.AccountService.SetTopPhotos(this.Account, TopPhotos);
        }
    }

    ConvertToDate(Time: number)
    {
        let Text = new Date(Time * 1000);
        return Text.toLocaleString();
    }

}
