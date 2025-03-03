import { Routes } from '@angular/router';
import {IndexComponent} from './pages/index/index.component';

export const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'movie/:id', loadComponent: () => import('./pages/movie-id/movie-id.component').then(m => m.MovieIdComponent)},
  {path: 'watch-list', loadComponent: () => import('./pages/watch-list/watch-list.component').then(m => m.WatchListComponent)},
];
