import { Component, OnInit, inject } from '@angular/core';
import {DatePipe, CommonModule} from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommunityCtaComponent} from "../../shared/components/community-cta/community-cta.component";
import {MomentSnapsService} from "../../service/moment-snaps.service";
import {MomentSnap} from "../../models/moment-snap";


@Component({
  selector: 'app-moment-snap',
  standalone: true,
  imports: [DatePipe, CommonModule, FormsModule, CommunityCtaComponent],
  templateUrl: './single-moment-snap.component.html',
  styleUrl: './single-moment-snap.component.scss'
})
export class SingleMomentSnapComponent implements OnInit{
  photo!: MomentSnap;
  suggestedPhotos: MomentSnap[] = [];
  relatedPhotos: MomentSnap[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
  ) { }

  private photoService = inject(MomentSnapsService);

  ngOnInit(): void {
    const photoId = this.route.snapshot.paramMap.get('id');
    if (photoId) {
      this.loadPhotoDetails(photoId); // 👈 reste string, pas besoin de +
    } else {
      console.error('No photo ID provided');
    }

    this.loadSuggestedPhotos();
    this.loadRelatedPhotos();
  }

  loadPhotoDetails(id: string): void {
    const moment = this.photoService.getMomentoraById(id);
    if (moment) {
      this.photo = moment;
      this.isLoading = false;
    } else {
      console.error('MomentSnap not found');
    }
  }

  loadSuggestedPhotos(): void {
    this.suggestedPhotos = this.photoService.getRelatedMoments(this.photo?.id ?? '');
  }

  loadRelatedPhotos(): void {
    this.relatedPhotos = this.photoService.getRelatedMoments(this.photo?.id ?? '');
  }

  downloadImage(): void {
    // Implémentation du téléchargement
    console.log('Downloading image...');
  }

  toggleLike(): void {
    this.photo.likes += this.photo.isLiked ? -1 : 1;
    this.photo.isLiked = !this.photo.isLiked;
  }

  toggleSave(): void {
    this.photo.saves += this.photo.isSaved ? -1 : 1;
    this.photo.isSaved = !this.photo.isSaved;
  }

  toggleFollow(): void {
    this.photo.author.isFollowing = !this.photo.author.isFollowing;
  }
}
