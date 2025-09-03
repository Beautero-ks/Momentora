import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../core/service/auth.service";
import {Router, RouterOutlet} from "@angular/router";
import {CommonModule} from "@angular/common";
import {MomentSnap} from "../../models/moment-snap.model";
import {DashboardService} from "./service/dashboard.service";
import {SidebarComponent} from "./layout/sidebar/sidebar.component";
import {HeaderComponent} from "../../core/components/header/header.component";
import {FooterComponent} from "../../core/components/footer/footer.component";
import {DasboardHeaderComponent} from "./layout/dasboard-header/dasboard-header.component";
import {DasboardFooterComponent} from "./layout/dasboard-footer/dasboard-footer.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterOutlet, HeaderComponent, FooterComponent, DasboardHeaderComponent, DasboardFooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  userName: string = '';
  stats = {
    totalPhotos: 0,
    totalLikes: 0,
    totalFollowers: 0,
    weeklyUploads: 0
  };

  snaps: MomentSnap[] = [];

  private dashboardService = inject(DashboardService);
  private authService = inject(AuthService)
  private router = inject(Router)

  ngOnInit(): void {
    // Simuler une récupération d'utilisateur
    const user = this.authService.getCurrentUser();
    this.userName = user?.name || 'User';

    // Simuler des statistiques
    this.stats = {
      totalPhotos: 24,
      totalLikes: 546,
      totalFollowers: 1200,
      weeklyUploads: 5
    };

    this.dashboardService.getAllSnaps().subscribe(data => {
      this.snaps = data;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
