import {Component, OnInit, inject} from '@angular/core';
import { Observable} from "rxjs";
import { map } from "rxjs/operators";
import { MomentSnap} from "../../../../models/moment-snap.model";
import {DashboardService} from "../../service/dashboard.service";

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss'
})
export class PhotosComponent {
  photos: MomentSnap[] = [];
  loading = true;
  userId = localStorage.getItem('userId')!;

  private dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.dashboardService.getUserPhotos(this.userId).subscribe(userPhoto => {
      this.photos = userPhoto;
      this.loading = false;
    });
  }
}
