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

    constructor(private route: ActivatedRoute, private Translate: TranslateService, public DataService: DataService, public InstagramService: InstagramService) { }

    async ngOnInit(): Promise<void> 
    {
        this.Account = this.DataService.Accounts[this.route.snapshot.paramMap.get('id')];

        this.AccountCurrentFollowers = this.Account.currentfollowers;

        this.AccountMonthlyGain = this.Account.monthfollowers-this.AccountCurrentFollowers;
        this.AccountDailyGain = this.Account.dayfollowers-this.AccountCurrentFollowers;
        
        await this.InstagramService.GetTopPhotos(this.Account.id);
    }

    ConvertToDate(Time: number)
    {
        let Text = new Date(Time*1000);
        return Text.toLocaleString();
    }

}
