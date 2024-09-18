import { Routes } from '@angular/router';
import { MainComponent } from './components/home/main/main.component';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo, } from '@angular/fire/auth-guard'
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NutritionComponent } from './components/home/nutrition/nutrition.component';
import { CalendarComponent } from './components/home/calendar/calendar.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/main'},
    { path: 'main', component: MainComponent,
        ...canActivate(()=> redirectUnauthorizedTo(['/login']))
    },
    {path: 'register', component: RegisterComponent, ...canActivate(()=>redirectLoggedInTo(['/main']))},
    {path: 'login', component: LoginComponent, ...canActivate(()=>redirectLoggedInTo(['/main']))},
    {path: 'nutrition', component: NutritionComponent, ...canActivate(()=>redirectUnauthorizedTo(['/login']))},
    {path: 'calendar', component: CalendarComponent, ...canActivate(()=>redirectUnauthorizedTo(['/login']))},

];
