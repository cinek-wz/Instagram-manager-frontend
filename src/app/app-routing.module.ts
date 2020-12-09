import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './Components/Other/Guest/Home/home.component';
import { RegisterComponent } from './Components/Other/Guest/Register/register.component';
import { LoginComponent } from './Components/Other/Guest/Login/login.component';

import { DashboardComponent } from './Components/Other/User/Dashboard/dashboard.component';
import { SettingsComponent } from './Components/Other/User/Settings/settings.component';

import { AuthGuard } from './Guards/auth.guard';
import { LoginGuard } from './Guards/login.guard';

const routes: Routes = 
[
    // Non authenticated users
    { 
        path: '', 
        component: HomeComponent,
        canActivate: [ LoginGuard ]
    },
    { 
        path: 'login', 
        component: LoginComponent,
        canActivate: [ LoginGuard ]
    },
    { 
        path: 'register', 
        component: RegisterComponent,
        canActivate: [ LoginGuard ]
    },
    // Authenticated users
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [ AuthGuard ]
    },
    { 
        path: 'settings', 
        component: SettingsComponent,
        canActivate: [ AuthGuard ]
    },
    // Other
    { 
        path: '**', 
        redirectTo: '/',
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
