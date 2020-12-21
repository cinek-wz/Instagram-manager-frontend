import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/Services/data.service';
import { InstagramService } from 'src/app/Services/instagram.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit 
{
    constructor(private Translate: TranslateService, public DataService: DataService, public InstagramService: InstagramService) { }

    ngOnInit() { }
}
