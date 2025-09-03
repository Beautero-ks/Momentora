import {inject, Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MomentSnap } from "../models/moment-snap";
import { SnapType } from "../models/snap-type.type";
import { Author } from "../models/author.model"
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MomentSnapsService {
  private momentSnaps: MomentSnap[] = [];
  private mockSuggestedPhotos: any[] = [];
  private mockRelatedPhotos: any[] = [];
  private http = inject(HttpClient);
  private baseUrl = "http://localhost:3000/photos";

  constructor() {
    this.initializeMockData();
  }


  private initializeMockData(): void {
    // Main photos data
    this.momentSnaps = [
      this.createMomentSnap(
        'Misty Mountains',
        'Explore the Misty Mountains in Middle-earth, a range of mountains known for their perilous paths and breathtaking views.',
        new Date(),
        'J.R.R. Tolkieny',
        'https://picsum.photos/200/300',
        'https://images.unsplash.com/photo-1743482858217-5aef42cfc636?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        0,
        ['Nature'],
        'Middle-earth'
      ),
      this.createMomentSnap(
        'Studio Photography',
        'Change the way you capture moments with our professional studio photography services. Perfect for portraits, events, and more.',
        new Date(),
        'Sudo',
        'https://picsum.photos/200/300',
        'https://plus.unsplash.com/premium_photo-1682097066897-209d0d9e9ae5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D',
        50,
        ['Urban']
      ),
      this.createMomentSnap(
        'Holding Camera to take picture',
        'A man holding a camera, capturing the essence of life through the lens. Every click tells a story.',
        new Date(),
        'John Doe',
        'https://picsum.photos/200/300',
        'https://plus.unsplash.com/premium_photo-1674389991678-0836ca77c7f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D',
        0,
        ['Art']
      )
    ];

    // Suggested photos
    this.mockSuggestedPhotos = this.generateMockPhotos(5, [
      'Mountain View',
      'Forest Path',
      'Ocean Sunset',
      'Desert Dunes',
      'Autumn Trees'
    ], 300, 200);

    // Related photos
    this.mockRelatedPhotos = this.generateMockPhotos(6, [
      'Waterfall',
      'Lake',
      'Valley',
      'Canyon',
      'Beach',
      'Cliffs'
    ], 400, 300);
  }

  private createMomentSnap(
    title: string,
    description: string,
    createdDate: Date,
    authorName: string,
    authorAvatar: string,
    imageUrl: string,
    snaps: number,
    tags?: string[],
    location?: string
  ): MomentSnap {
    const author: Author = {
      name: authorName,
      avatar: authorAvatar,
      bio: `Professional photographer specializing in ${tags?.[0]?.toLowerCase() || 'general'} photography.`,
      isFollowing: false
    };

    const momentSnap = new MomentSnap(
      title,
      description,
      createdDate,
      author,
      imageUrl,
      snaps
    );

    if (tags) {
      momentSnap.withTags(tags);
    }

    if (location) {
      momentSnap.withLocation(location);
    }

    return momentSnap;
  }

  private generateMockPhotos(
    count: number,
    titles: string[],
    width: number,
    height: number
  ): any[] {
    return Array.from({ length: count }, (_, i) => ({
      id: (i + 2).toString(),
      title: titles[i] || `Photo ${i + 1}`,
      url: `https://source.unsplash.com/random/${width}x${height}?${titles[i]?.toLowerCase().replace(' ', '') || 'nature'}`,
      views: Math.floor(Math.random() * 10000),
      downloads: Math.floor(Math.random() * 3000),
      resolution: `${width}x${height}`,
      publishedDate: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
      likes: Math.floor(Math.random() * 1000),
      isLiked: false,
      fileType: 'JPEG',
      saves: Math.floor(Math.random() * 500),
      isSaved: false,
      author: {
        name: `Photographer ${i + 1}`,
        avatar: `https://source.unsplash.com/random/100x100?portrait&${i}`,
        bio: `Professional photographer specializing in ${titles[i]?.toLowerCase() || 'nature'} photography.`,
        isFollowing: false
      }
    }));
  }

  // Methods from original MomentSnapsService
  getMomentSnaps(): MomentSnap[] {
    return [...this.momentSnaps];
  }

  getMomentoraById(id: string): MomentSnap {
    const foundMomentSnap = this.momentSnaps.find(snap => snap.id === id);
    if (!foundMomentSnap) {
      throw new Error(`MomentSnap with id ${id} not found`);
    }
    return foundMomentSnap;
  }

  snapMomentSnapById(id: string, snapType: SnapType): void {
    const momentora = this.getMomentoraById(id);
    momentora.snaps(snapType);
  }

  getRelatedMoments(excludeId: string): MomentSnap[] {
    return this.momentSnaps
      .filter(snap => snap.id !== excludeId)
      .slice(0, 5);
  }

  // Methods from PhotoService
  // getPhotoById(id: number): Observable<any> {
  //   const photo = this.momentSnaps.find(p => +p.id === id);
  //   return of(photo ? this.enrichPhotoData(photo) : null).pipe(delay(500));
  // }

  getSuggestedPhotos(): Observable<any[]> {
    return of(this.mockSuggestedPhotos).pipe(delay(300));
  }

  getRelatedPhotos(): Observable<any[]> {
    return of(this.mockRelatedPhotos).pipe(delay(400));
  }

  private enrichPhotoData(momentSnap: MomentSnap): any {
    return {
      ...momentSnap,
      views: Math.floor(Math.random() * 10000),
      downloads: Math.floor(Math.random() * 3000),
      resolution: '1920x1080',
      publishedDate: momentSnap.createdDate.toISOString(),
      likes: momentSnap.snaps,
      isLiked: false,
      fileType: 'JPEG',
      saves: Math.floor(Math.random() * 500),
      isSaved: false,
      author: {
        name: momentSnap.author,
        avatar: 'https://source.unsplash.com/random/100x100?portrait',
        bio: `Professional photographer specializing in ${momentSnap.title.toLowerCase()} photography.`,
        isFollowing: false
      }
    };
  }
}
