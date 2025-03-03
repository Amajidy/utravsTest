import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {NzCarouselModule} from 'ng-zorro-antd/carousel';
import {MoviesFacade} from '../../api/facade/movies.facade';
import {environment} from '../../../environments/environment';
import {RouterLink} from '@angular/router';
import {ImdbComponent} from '../../components/imdb/imdb.component';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-index',
  imports: [NzCarouselModule, AsyncPipe, RouterLink, ImdbComponent, NzInputDirective, NzSelectComponent, NzOptionComponent, NzButtonComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit {
  private _moviesFacade = inject(MoviesFacade);
  popular$ = this._moviesFacade.popularMovies$
  genres$ = this._moviesFacade.genres$



  ngOnInit() {
    this._moviesFacade.getPopularMovies()
    this._moviesFacade.getGenres()
  }

}
