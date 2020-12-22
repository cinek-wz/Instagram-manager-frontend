import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService
{
    constructor(private http: HttpClient) { }

    public Login(Login: string, Password: string): Observable<Object>
    {
        return this.http.post("/api/login", { login: Login, password: Password });
    }

    public Register(Login: string, Email: string, Password: string): Observable<Object>
    {
        return this.http.post("/api/register", { login: Login, email: Email, password: Password });
    }
    
    public Logout(): Observable<Object>
    {
        return this.http.get("/api/logout");
    }

    public GetProfile(): Observable<Object>
    {
        return this.http.get("/api/user/profile");
    }

    public ModifyProfile(Email: string): Observable<Object>
    {
        return this.http.post("/api/user/profile", { email: Email });
    }

    public GetInstagramAccounts(): Observable<Object>
    {
        return this.http.post("/api/instagram/accounts", {});
    }

    public DeleteInstagramAccount(ID: number): Observable<Object>
    {
        return this.http.post("/api/instagram/removeaccount", { accountid: ID });
    }

    public ChangeInstagramAccountStatus(ID: number, Status: boolean): Observable<Object>
    {
        return this.http.post("/api/instagram/accountstatus", { accountid: ID, status: Status });
    }

    // Account functions

    public GetTopPhotos(ID: number): Observable<Object>
    {
        return this.http.post("/api/instagram/topphotos", { accountid: ID } );
    }
}
