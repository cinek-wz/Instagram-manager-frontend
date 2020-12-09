import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../Services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit 
{
    public Login: string;
    public Password: string;

    constructor(public UserService: UserService) { }

    ngOnInit() 
    {

    }
}
