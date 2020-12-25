import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';

import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';
import { DpDatePickerModule } from 'ng2-date-picker';

import { AppComponent } from './Components/Main/App/app.component';
import { NavigationComponent } from './Components/Main/Navigation/navigation.component';
import { FooterComponent } from './Components/Main/Footer/footer.component';

import { LoginComponent } from './Components/Other/Guest/Login/login.component';
import { RegisterComponent } from './Components/Other/Guest/Register/register.component';
import { HomeComponent } from './Components/Other/Guest/Home/home.component';

import { DashboardComponent } from './Components/Other/User/Dashboard/dashboard.component';
import { SettingsComponent } from './Components/Other/User/Settings/settings.component';
import { AccountComponent } from './Components/Other/User/AccountRouter/account.component';
import { HeaderComponent } from './Components/Helper/Header/header.component';
import { InstagramPanelComponent } from './Components/Other/User/Account/Instagram-panel/instagram-panel.component';
import { TagsFinderComponent } from './Components/Other/User/Account/Tags-finder/tags-finder.component';
import { InsightsComponent } from './Components/Other/User/Account/Insights/insights.component';
import { SchedulerComponent } from './Components/Other/User/Account/Scheduler/scheduler.component';
import { DataLoaderComponent } from './Components/Helper/Data-loader/data-loader.component';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        FooterComponent,
        LoginComponent,
        DashboardComponent,
        RegisterComponent,
        HomeComponent,
        SettingsComponent,
        AccountComponent,
        HeaderComponent,
        InstagramPanelComponent,
        TagsFinderComponent,
        InsightsComponent,
        SchedulerComponent,
        DataLoaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        ChartsModule,
        DpDatePickerModule,
        ToastrModule.forRoot({ maxOpened: 3, autoDismiss: true, positionClass: 'toast-bottom-right', progressBar: true, closeButton: true, tapToDismiss: false }),
        TranslateModule.forRoot({
            defaultLanguage: 'pl',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        HttpClientModule
    ],
    providers: [ ],
    bootstrap: [AppComponent],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
