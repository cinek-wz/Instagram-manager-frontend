import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { DataService } from 'src/app/Services/data.service';
import { InstagramService } from 'src/app/Services/instagram.service';

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

    constructor(private route: ActivatedRoute, private Translate: TranslateService, public DataService: DataService, public InstagramService: InstagramService) { }

    ngOnInit(): void 
    {
        this.Account = this.DataService.Accounts[this.route.snapshot.parent.paramMap.get('id')];
    }

    async GetSimilarTags()
    {
        if(this.Tag.length > 1)
        {
            this.APIRequestTime = true;
            this.Tags = await this.InstagramService.GetSimilarTags(this.Account.id, this.Tag);
            this.APIRequestTime = false;
        }
    }
}
