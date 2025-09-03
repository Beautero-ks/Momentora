import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-community-cta',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './community-cta.component.html',
  styleUrl: './community-cta.component.scss'
})
export class CommunityCtaComponent {

}
