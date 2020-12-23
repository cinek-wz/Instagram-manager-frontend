import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './Components/Other/Guest/Home/home.component';
import { RegisterComponent } from './Components/Other/Guest/Register/register.component';
import { LoginComponent } from './Components/Other/Guest/Login/login.component';

import { DashboardComponent } from './Components/Other/User/Dashboard/dashboard.component';
import { SettingsComponent } from './Components/Other/User/Settings/settings.component';

import { AuthGuard } from './Guards/auth.guard';
import { LoginGuard } from './Guards/login.guard';
import { AccountComponent } from './Components/Other/User/AccountRouter/account.component';
import { InstagramPanelComponent } from './Components/Other/User/Account/Instagram-panel/instagram-panel.component';
import { TagsFinderComponent } from './Components/Other/User/Account/Tags-finder/tags-finder.component';
import { InsightsComponent } from './Components/Other/User/Account/Insights/insights.component';
import { SchedulerComponent } from './Components/Other/User/Account/Scheduler/scheduler.component';

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
        canActivate: [ LoginGuard ],
        data: { title: "components.login.title" }
    },
    { 
        path: 'register', 
        component: RegisterComponent,
        canActivate: [ LoginGuard ],
        data: { title: "components.register.title" }
    },
    // Authenticated users
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [ AuthGuard ],
        data: { title: "components.dashboard.title" }
    },
    { 
        path: 'settings', 
        component: SettingsComponent,
        canActivate: [ AuthGuard ],
        data: { title: "components.settings.title" }
    },
    {
        path: 'account/:id',
        component: AccountComponent,
        canActivate: [ AuthGuard ],
        data: { title: "components.account.title" },
        children: 
        [
            { path: '', component: InstagramPanelComponent },
            { path: 'tags', component: TagsFinderComponent },
            { path: 'insights', component: InsightsComponent },
            { path: 'scheduler', component: SchedulerComponent },
        ]
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
