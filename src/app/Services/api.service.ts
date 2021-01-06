import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService
{
    constructor(private http: HttpClient) { }

    public Login(Login: string, Password: string): Observable<Object>
    {
        return this.http.post('/api/login', { login: Login, password: Password });
    }

    public Register(Login: string, Email: string, Password: string): Observable<Object>
    {
        return this.http.post('/api/register', { login: Login, email: Email, password: Password });
    }
    
    public Logout(): Observable<Object>
    {
        return this.http.get('/api/logout');
    }

    public GetProfile(): Observable<Object>
    {
        return this.http.get('/api/user/profile');
    }

    public ModifyProfile(Email: string): Observable<Object>
    {
        return this.http.post('/api/user/profile', { email: Email });
    }

    public GetInstagramAccounts(): Observable<Object>
    {
        return this.http.get('/api/instagram/accounts');
    }

    public DeleteInstagramAccount(ID: number): Observable<Object>
    {
        return this.http.request('delete', '/api/instagram/account', { body: { accountid: ID }} );
    }

    public ChangeInstagramAccountStatus(ID: number, Status: boolean): Observable<Object>
    {
        return this.http.put('/api/instagram/account', { accountid: ID, status: Status });
    }

    // Account functions

    public GetTopPhotos(ID: number): Observable<Object>
    {
        const params = new HttpParams().append('accountid', ID.toString());
        return this.http.get('/api/instagram/topphotos', { params: params } );
    }

    public GetSimilarTags(ID: number, Tag: string): Observable<Object>
    {
        return this.http.post('/api/instagram/similartags', { accountid: ID, tag: Tag } );
    }

    public GetInsights(AccountID: number): Observable<Object>
    {
        const params = new HttpParams().append('accountid', AccountID.toString());

        return this.http.get('/api/instagram/insights', { params: params } );
    }

    public GetSchedule(ID: number)
    {
        const params = new HttpParams().append('accountid', ID.toString());
        
        return this.http.request('get', '/api/instagram/photoscheduler', { params: params });
    }

    public AddSchedule(ID: number, Description: string, Date: string, Photo: any)
    {
        const uploadData = new FormData();
        uploadData.append('uploaded_photo', Photo);
        uploadData.append('accountid', ID.toString());
        uploadData.append('description', Description);
        uploadData.append('date', Date);

        return this.http.post('/api/instagram/photoscheduler', uploadData);
    }

    public DeleteSchedule(AccountID: number, ScheduleID)
    {
        return this.http.request('delete', '/api/instagram/photoscheduler', {body: { accountid: AccountID, scheduleid: ScheduleID }});
    }
}
