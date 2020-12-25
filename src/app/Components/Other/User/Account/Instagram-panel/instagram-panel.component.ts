import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { DataService } from 'src/app/Services/data.service';
import { InstagramService } from 'src/app/Services/instagram.service';

@Component({
  selector: 'app-instagram-panel',
  templateUrl: './instagram-panel.component.html',
  styleUrls: ['./instagram-panel.component.scss']
})
export class InstagramPanelComponent implements OnInit 
{
    public Account;
    public AccountMonthlyGain;
    public AccountDailyGain;
    public AccountCurrentFollowers;

    public TopPhotos: any = null;

    constructor(private route: ActivatedRoute, private Translate: TranslateService, public DataService: DataService, public InstagramService: InstagramService) { }

    async ngOnInit()
    {
        this.Account = this.DataService.Accounts[this.route.snapshot.parent.paramMap.get('id')];

        this.AccountCurrentFollowers = this.Account.currentfollowers;

        this.AccountMonthlyGain = this.AccountCurrentFollowers - this.Account.monthfollowers;
        this.AccountDailyGain = this.AccountCurrentFollowers - this.Account.dayfollowers;

        if(this.Account.topphotos == null)
        {
            this.TopPhotos = await this.InstagramService.GetTopPhotos(this.Account.id);
            this.Account.topphotos = this.TopPhotos;
        }
        else
        {
            this.TopPhotos = this.Account.topphotos;
        }
    }

    ConvertToDate(Time: number)
    {
        let Text = new Date(Time*1000);
        return Text.toLocaleString();
    }

}
