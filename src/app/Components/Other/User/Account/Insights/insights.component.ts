import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { DataService } from 'src/app/Services/data.service';
import { InstagramService } from 'src/app/Services/instagram.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss']
})
export class InsightsComponent implements OnInit 
{
    public Account;
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

    constructor(private route: ActivatedRoute, private Translate: TranslateService, public DataService: DataService, public InstagramService: InstagramService) { }

    async ngOnInit()
    {
        this.Account = this.DataService.Accounts[this.route.snapshot.parent.paramMap.get('id')];
        await this.GetInsights();
    }

    async GetInsights()
    {
        let Data: any = await this.InstagramService.GetInsights(this.Account.id);

        if(Data.business === false)
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

                    this.barChartData[p].data.push(Points[p*3].value);
                    await new Promise(r => setTimeout(r, 10));
                }
            }
        }
    }
}