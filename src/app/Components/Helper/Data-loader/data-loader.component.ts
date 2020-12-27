import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-loader',
  templateUrl: './data-loader.component.html',
  styleUrls: ['./data-loader.component.scss']
})
export class DataLoaderComponent implements OnInit 
{
    @Input() Condition;

    @Input() ErrorCondition;
    @Input() ErrorMessage: string;

    constructor() { }

    ngOnInit() { }

}
