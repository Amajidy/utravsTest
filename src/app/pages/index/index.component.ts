import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {NzCarouselComponent, NzCarouselContentDirective, NzCarouselModule} from 'ng-zorro-antd/carousel';
import {MoviesFacade} from '../../api/facade/movies.facade';
import {environment} from '../../../environments/environment';
import {AuthorImgPipe} from '../../pipes/authorImg.pipe';
import {RouterLink} from '@angular/router';
import {ImdbComponent} from '../../components/imdb/imdb.component';

@Component({
  selector: 'app-index',
  imports: [NzCarouselModule , AsyncPipe, RouterLink, ImdbComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit {
  private _moviesFacade = inject(MoviesFacade);
  popular$ = this._moviesFacade.popularMovies$

  ngOnInit() {
    this._moviesFacade.getPopularMovies()
  }

  protected readonly environment = environment;
}
