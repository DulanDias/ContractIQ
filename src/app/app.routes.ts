import { Routes } from '@angular/router';
import { ExtractorComponent } from './extractor/extractor.component';
import { InterrogatorComponent } from './interrogator/interrogator.component';
import { NotFoundComponent } from './404/404.component';

export const routes: Routes = [
  { path: 'extractor', component: ExtractorComponent },
  { path: 'interrogator', component: InterrogatorComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  // Wildcard route to handle 404
  { path: '**', component: NotFoundComponent }
];
