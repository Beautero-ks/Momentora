import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MomentSnapComponent} from "./features/moment-snap/moment-snap.component";
import {MomentSnap} from "./models/moment-snap";
import {MomentSnapListComponent} from "./features/moment-snap-list/moment-snap-list.component";
import {HeaderComponent} from "./core/components/header/header.component";
import {FooterComponent} from "./core/components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'momentora';
}
