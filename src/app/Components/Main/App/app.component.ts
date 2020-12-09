import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { UserService } from './../../../Services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
    constructor(public UserService: UserService, public Translate: TranslateService) { }

    ngOnInit() 
    {
        this.LoadLanguage();
        this.UserService.GetUser();
    }

    LoadLanguage()
    {
        let Language = localStorage.getItem("lang");

        if(Language == null)
        {
            this.Translate.use('pl');
            localStorage.setItem("lang", 'pl');
        }
        else
        {
            this.Translate.use(Language);
        }

        this.Translate.onLangChange.subscribe((event: LangChangeEvent) => 
        {
            localStorage.setItem("lang", event.lang);
        });
    }
}
