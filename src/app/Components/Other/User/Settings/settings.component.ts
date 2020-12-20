import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})

export class SettingsComponent implements OnInit 
{

    public Email: string;

    constructor(public UserService: UserService) { }

    ngOnInit() { }

    ModifyProfile()
    {
        if(this.Email.length > 3)
        {
            this.UserService.ModifyProfile(this.Email); 
        }
    }
}
