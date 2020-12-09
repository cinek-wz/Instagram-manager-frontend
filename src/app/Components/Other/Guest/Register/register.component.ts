import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit
{
  public Login: string;
  public Email: string;
  public Password: string;

  constructor(public UserService: UserService) { }

  ngOnInit() {
  }

}
