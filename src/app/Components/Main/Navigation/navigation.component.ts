import { Component, OnInit } from '@angular/core';

import { UserService } from './../../../Services/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit 
{

    constructor(public UserService: UserService, public Translate: TranslateService) { }

    ngOnInit() {}

}
