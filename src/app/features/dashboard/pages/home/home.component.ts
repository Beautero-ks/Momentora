import {Component, inject, OnInit} from '@angular/core';
import {DashboardService} from "../../service/dashboard.service";
import {PhotoStats} from "../../models/photo-stats";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  stats = { total: 0, likes: 0 };
  userId = localStorage.getItem('userId')!;

  private dashService = inject(DashboardService);

  ngOnInit(): void {
    this.dashService.getPhotoStats(this.userId).subscribe((res:PhotoStats) => {
      this.stats = res;
    });
  }
}
