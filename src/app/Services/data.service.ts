import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService
{
    public Accounts: Array<Object> = null;

    constructor() { }

}