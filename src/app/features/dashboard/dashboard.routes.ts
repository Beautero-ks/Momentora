import {Routes} from "@angular/router";

export const dashboardRoutes: Routes = [
  {path: 'dashboard',
    canActivate: [() => import('./../../core/guard/auth.guard').then(m => m.authGuard)],
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent)
  },
  {path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {path: 'dashboard/photos', loadComponent: () => import('./pages/photos/photos.component').then(m => m.PhotosComponent)},
]
