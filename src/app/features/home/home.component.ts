import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {CommunityCtaComponent} from "../../shared/components/community-cta/community-cta.component";
import {MomentSnapsService} from "../../service/moment-snaps.service";
import {MomentSnap} from "../../models/moment-snap";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, CommunityCtaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isLoading = true;
  isError = false;
  errorMessage = 'An error occurred while loading the data. Please try again later.';

  trendingPhotos: MomentSnap[] = [];

  constructor(private momentService: MomentSnapsService) {
    setTimeout(() => {
      this.isLoading = false;
      // Uncomment the next line to simulate an error
      // this.isError = true;
    }, 2000);
  }

  ngOnInit(): void {
    this.trendingPhotos = this.momentService.getMomentSnaps(); // méthode déjà dispo
  }

}
