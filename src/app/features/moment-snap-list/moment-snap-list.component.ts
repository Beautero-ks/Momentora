import { Component, OnInit, inject } from '@angular/core';
import {MomentSnap} from "../../models/moment-snap";
import { MomentSnapsService } from "../../service/moment-snaps.service";
import { MomentSnapComponent } from "../moment-snap/moment-snap.component"
import { Router } from "@angular/router";

@Component({
  selector: 'app-moment-snap-list',
  standalone: true,
  imports: [MomentSnapComponent],
  templateUrl: './moment-snap-list.component.html',
  styleUrl: './moment-snap-list.component.scss'
})
export class MomentSnapListComponent implements OnInit {
  private momentSnapsService = inject(MomentSnapsService);
  moment!: MomentSnap[];

  popularTags = ['Nature', 'Travel', 'Portrait', 'Urban', 'Art', 'Sunset', 'Animals', 'Food'];
  activeTag = '';
  photosPerLoad = 12;
  currentDisplayCount = 0;
  allPhotos: any[] = [];
  totalMoments: number = 0;
  displayedPhotos: MomentSnap[] = [];

  private router = inject(Router);

  ngOnInit() {
    this.loadPhotos();
    this.moment = this.momentSnapsService.getMomentSnaps();
  }

  loadPhotos() {
    this.allPhotos = this.momentSnapsService.getMomentSnaps().map(photo => ({
      ...photo,
      author: {
        name: photo.author.name || 'Anonymous',
        avatar: photo.author.avatar || 'assets/default-avatar.jpg'
      }
    }));
    this.totalMoments = this.allPhotos.length;
    this.currentDisplayCount = this.photosPerLoad;
    this.displayedPhotos = this.allPhotos.slice(0, this.currentDisplayCount);
  }

  get hasMorePhotos(): boolean {
    return this.currentDisplayCount < this.allPhotos.length;
  }

  loadMore() {
    this.currentDisplayCount += this.photosPerLoad;
    this.displayedPhotos = this.allPhotos.slice(0, this.currentDisplayCount);
  }

  filterByTag(tag: string) {
    this.activeTag = this.activeTag === tag ? '' : tag;
    const filtered = this.activeTag
      ? this.allPhotos.filter(p => p.tags?.includes(this.activeTag))
      : this.allPhotos;
    this.currentDisplayCount = this.photosPerLoad;
    this.displayedPhotos = filtered.slice(0, this.currentDisplayCount);
  }

  isLiked(photoId: string): boolean {
    const likedPhotos = JSON.parse(localStorage.getItem('likedPhotos') || '{}');
    return !!likedPhotos[photoId];
  }

  toggleLike(photoId: string, event: Event) {
    event.stopPropagation();
    let likedPhotos = JSON.parse(localStorage.getItem('likedPhotos') || '{}');
    likedPhotos[photoId] = !likedPhotos[photoId];
    localStorage.setItem('likedPhotos', JSON.stringify(likedPhotos));
  }

  viewDetails(photoId: string) {
    this.router.navigate(['/explore', photoId]);
  }
}
