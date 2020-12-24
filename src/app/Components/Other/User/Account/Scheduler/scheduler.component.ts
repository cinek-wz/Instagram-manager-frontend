import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { DataService } from 'src/app/Services/data.service';
import { InstagramService } from 'src/app/Services/instagram.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit
{
    public Account;

    public Schedules;

    public SelectedFile: File;
    public Description: string;
    public Date: Date;

    public LoadedFile;

    public DatePickerConfig = {
        showTwentyFourHours: true,
        locale: 'pl',
        firstDayOfWeek: 'mo'
    };

    constructor(private route: ActivatedRoute, private Translate: TranslateService, private domSanitizer: DomSanitizer, public DataService: DataService, public InstagramService: InstagramService) { }

    ngOnInit(): void
    {
        this.Account = this.DataService.Accounts[this.route.snapshot.parent.paramMap.get('id')];
        this.GetSchedule();
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

    async GetSchedule()
    {
        this.Schedules = await this.InstagramService.GetSchedules(this.Account.id);
    }

    async AddSchedule()
    {
        if (this.SelectedFile != null)
        {
            await this.InstagramService.AddSchedule(this.Account.id, this.Description, this.Date.toISOString(), this.SelectedFile);
            this.SelectedFile = null;
            this.Description = null;
            this.Date = null;

            await this.GetSchedule();
        }
    }

    async DeleteSchedule(AccountID: number, ScheduleID)
    {
        this.InstagramService.DeleteSchedule(AccountID, ScheduleID);
        await this.GetSchedule();
    }
}
