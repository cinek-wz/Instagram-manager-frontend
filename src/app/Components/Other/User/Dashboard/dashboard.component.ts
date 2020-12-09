import { Component, OnInit, ViewChild } from '@angular/core';
import { APIService } from 'src/app/Services/api.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit 
{
    constructor(private API: APIService) { }

    ngOnInit() { }
}
