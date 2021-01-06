import { Component, OnInit } from '@angular/core';

import { InstagramAccount, AccountQuery, InstagramTopPhoto } from '../../../../../Stores/Account/account.store';
import { AccountService } from './../../../../../Stores/Account/account.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnInit 
{
    public Account: InstagramAccount;
    public BusinessAccount: boolean = null;

    public barChartOptions = { scaleShowVerticalLines: false, responsive: true };  

    public barChartLabels = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
    public barChartType = 'bar';
    public barChartLegend = true;  

    public barChartData = 
    [
        {data: [], label: '00:00'},
        {data: [], label: '03:00'},
        {data: [], label: '06:00'},
        {data: [], label: '09:00'},
        {data: [], label: '12:00'},
        {data: [], label: '15:00'},
        {data: [], label: '18:00'},
        {data: [], label: '21:00'}
    ];

    constructor(
        public AccountQuery: AccountQuery, 
        public AccountService: AccountService
    ) { }

    async ngOnInit()
    {
        this.Account = this.AccountQuery.getActive();

        if (this.Account.insights == null)
        {
            let Data = await this.AccountService.GetInsights();
            await this.SetInsights(Data);
        }
        else
        {
            await this.SetInsights(this.Account.insights);
        }
    }

    async SetInsights(Data)
    {
        if (Data.business === false)
        {
            this.BusinessAccount = false;
            return;
        }
        else
        {
            let DataArray = Data.data;
            this.BusinessAccount = true;

            for(let i = 0 ; i < 7; i++)
            {
                for(let p = 0 ; p < 8; p++)
                {
                    let Points = DataArray[i].data_points;

                    this.barChartData[p].data.push(Points[p * 3].value);
                }
            }
        }
    }
}