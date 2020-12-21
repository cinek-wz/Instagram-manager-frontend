import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit 
{
    public AccountIndex;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void 
    {
        this.AccountIndex = this.route.snapshot.paramMap.get('id');
    }

}
