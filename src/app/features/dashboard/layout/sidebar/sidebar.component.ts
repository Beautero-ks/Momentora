import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  isCollapsed = false;

  navLinks = [
    { label: 'Home', icon: 'fas fa-home', route: '/dashboard/home' },
    { label: 'My Photos', icon: 'fas fa-camera', route: '/dashboard/photos' },
    { label: 'Settings', icon: 'fas fa-cog', route: '/dashboard/settings' }
  ];

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
