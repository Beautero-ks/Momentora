import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// Je ne suis pas trop d'accor avec la fontion login dans le authservice. cela implique l'email doit etre toujour test@momentora.com. Ce n'est pourtant pas ce qu'on veut. l'email doit etre pour le user qu'on recupere pour testé si je ne me trompe pas
