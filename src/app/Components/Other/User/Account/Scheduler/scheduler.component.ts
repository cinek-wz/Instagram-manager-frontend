import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { InstagramAccount, AccountQuery, InstagramTopPhoto } from '../../../../../Stores/Account/account.store';
import { AccountService } from './../../../../../Stores/Account/account.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit
{
    public Account: InstagramAccount;

    public SelectedFile: File;
    public Description: string;
    public Date: Date;

    public LoadedFile;

    public DatePickerConfig = {
        showTwentyFourHours: true,
        locale: 'pl',
        firstDayOfWeek: 'mo'
    };

    constructor(
        private domSanitizer: DomSanitizer, 
        public AccountQuery: AccountQuery, 
        public AccountService: AccountService
    ) { }

    async ngOnInit()
    {
        this.Account = this.AccountQuery.getActive();

        if (this.Account.schedules == null)
        {
            await this.AccountService.GetSchedules();
        }
    }

    onFileChanged(files: FileList)
    {
        this.SelectedFile = files[0];

        const reader = new FileReader();
        reader.onload = (event) =>
        {
            this.LoadedFile = event.target.result;
        };
        
        reader.readAsDataURL(this.SelectedFile);
    }

    GetImageFromBuffer(buffer)
    {
        return this.domSanitizer.bypassSecurityTrustUrl(`data:image/png;base64, ${btoa(Array.from(new Uint8Array(buffer)).map(b => String.fromCharCode(b)).join(''))}`);
    }
    
    FormatDate(date: Date)
    {
        return new Date(date).toLocaleDateString('pl', {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'});
    }
}
