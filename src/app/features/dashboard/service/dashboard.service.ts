import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MomentSnap} from "../../../models/moment-snap.model";
import { map } from "rxjs/operators";
import {PhotoStats} from "../models/photo-stats";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private baseUrl = "http://localhost:3000/photos";

  constructor() { }

  getAllSnaps(): Observable<MomentSnap[]> {
    return this.http.get<MomentSnap[]>(`${this.baseUrl}?_expand=author`);
  }

  getUserPhotos(userId: string): Observable<MomentSnap[]> {
    return this.http.get<MomentSnap[]>(
      `${this.baseUrl}?userId=${userId}&_expand=author`
    );
  }

  getPhotoStats(userId: string): Observable<PhotoStats> {
    return this.getUserPhotos(userId).pipe(
      map(snaps => ({
        total: snaps.length,
        likes: snaps.reduce((sum, s) => sum + s.likes, 0),
      }))
    );
  }
  getSnapById(id: string): Observable<MomentSnap> {
    return this.http.get<MomentSnap>(`${this.baseUrl}/${id}?_expand=author`);
  }

  likeSnap(id: string, currentLikes: number): Observable<MomentSnap> {
    return this.http.patch<MomentSnap>(`${this.baseUrl}/${id}`, { likes: currentLikes + 1 });
  }

  uploadSnap(snap: Partial<MomentSnap>): Observable<MomentSnap> {
    return this.http.post<MomentSnap>(this.baseUrl, snap);
  }
}
