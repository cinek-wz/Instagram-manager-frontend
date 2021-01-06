import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { InstagramAccount, AccountQuery, InstagramTopPhoto } from '../../../../../Stores/Account/account.store';
import { AccountService } from './../../../../../Stores/Account/account.service';

@Component({
  selector: 'app-tags-finder',
  templateUrl: './tags-finder.component.html',
  styleUrls: ['./tags-finder.component.scss']
})
export class TagsFinderComponent implements OnInit 
{
    public Account;

    public Tag: string;
    public Tags;

    public APIRequestTime = false;

    constructor(
        public AccountQuery: AccountQuery, 
        public AccountService: AccountService,
        public Translate: TranslateService
    ) { }

    ngOnInit()
    {
        this.Account = this.AccountQuery.getActive();
    }

    async GetSimilarTags()
    {
        if (this.Tag.length > 1)
        {
            this.APIRequestTime = true;
            this.Tags = await this.AccountService.GetSimilarTags(this.Tag);
            this.APIRequestTime = false;
        }
    }
}
