import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit 
{
    public AccountIndex;
    public AccountLogin;

    constructor(private route: ActivatedRoute, private Translate: TranslateService, public DataService: DataService) { }

    ngOnInit(): void 
    {
        this.AccountIndex = this.route.snapshot.paramMap.get('id');
        this.AccountLogin = this.DataService.Accounts[this.AccountIndex].login;
    }

}
