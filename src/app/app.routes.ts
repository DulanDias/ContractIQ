import { Routes } from '@angular/router';
import { ExtractorComponent } from './extractor/extractor.component';
import { InterrogatorComponent } from './interrogator/interrogator.component';
import { NotFoundComponent } from './404/404.component';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'extractor', component: ExtractorComponent },
  { path: 'interrogator', component: InterrogatorComponent },
  // Wildcard route to handle 404
  { path: '**', component: NotFoundComponent }
];
