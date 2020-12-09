import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';

import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './Components/Main/App/app.component';
import { NavigationComponent } from './Components/Main/Navigation/navigation.component';
import { FooterComponent } from './Components/Main/Footer/footer.component';

import { LoginComponent } from './Components/Other/Guest/Login/login.component';
import { RegisterComponent } from './Components/Other/Guest/Register/register.component';
import { HomeComponent } from './Components/Other/Guest/Home/home.component';

import { DashboardComponent } from './Components/Other/User/Dashboard/dashboard.component';
import { SettingsComponent } from './Components/Other/User/Settings/settings.component';

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
        SettingsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        ToastrModule.forRoot({ maxOpened: 5, autoDismiss: true, positionClass: 'toast-bottom-right', progressBar: true, closeButton: true, tapToDismiss: false }),
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
