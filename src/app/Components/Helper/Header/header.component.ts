import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit 
{
    public Title;
    
    constructor(private route: ActivatedRoute, private Translate: TranslateService) { }

    ngOnInit(): void 
    {
        this.Title = this.Translate.instant(this.route.snapshot.data['title']);
    }

}
