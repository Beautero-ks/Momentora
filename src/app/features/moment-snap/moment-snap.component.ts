import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MomentSnap} from "../../models/moment-snap";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";



@Component({
  selector: 'app-moment-snap',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './moment-snap.component.html',
  styleUrl: './moment-snap.component.scss',
})
export class MomentSnapComponent {
  @Input() momentSnap!: MomentSnap;
  @Input() isLoading: boolean = false;
  @Input() isLiked: boolean = false;
  @Output() likeClicked = new EventEmitter<Event>();
  @Output() photoClicked = new EventEmitter<void>();

  onLikeClick(event: Event) {
    this.likeClicked.emit(event);
  }

  viewDetails() {
    this.photoClicked.emit();
  }
}
