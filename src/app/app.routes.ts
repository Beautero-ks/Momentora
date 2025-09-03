import { Routes } from '@angular/router';
import { MomentSnapListComponent } from './features/moment-snap-list/moment-snap-list.component';
import { HomeComponent } from './features/home/home.component';
import { SingleMomentSnapComponent } from './features/single-moment-snap/single-moment-snap.component';
import { authRoutes } from './features/auth/auth.routes';
import {dashboardRoutes} from "./features/dashboard/dashboard.routes";

export const routes: Routes = [
  {path: 'explore', component: MomentSnapListComponent, pathMatch: "full"},
  {path: 'explore/:id', component: SingleMomentSnapComponent, pathMatch: "full"},
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  {path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)},
  {path: '', children: authRoutes},
  {path: '', children: dashboardRoutes}

];
