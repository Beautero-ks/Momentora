import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {UploadModalComponent} from "../../../shared/components/upload-modal/upload-modal.component";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule,  FormsModule, UploadModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router)
  isDarkMode = false;
  searchFocused = false;
  showUserMenu = false;
  showUploadModal = false;
  mobileMenuOpen = false;
  unreadNotifs = 3;
  userAvatar = "/assets/default-avatar.jpeg"; // Chemin vers l'avatar par défaut

  searchResults = [
    { id: 1, title: 'Coucher de soleil à Bali' },
    { id: 2, title: 'Randonnée montagne' }
  ];

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme', this.isDarkMode);
  }

  toggleUserMenu() {
    console.log('User menu toggled');
    this.showUserMenu = !this.showUserMenu;
  }

  openUploadDialog() {
    this.showUploadModal = true;
  }

  closeUploadDialog() {
    this.showUploadModal = false;
  }

  toggleNotifications() {
    this.unreadNotifs = 0;
    // Implémentation l'affichage des notifications
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file);
      // stocker le fichier pour upload plus tard
    }
  }


  logout() {
    // Logique de déconnexion
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
