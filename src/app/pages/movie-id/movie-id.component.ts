import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MoviesFacade} from '../../api/facade/movies.facade';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AsyncPipe, DatePipe, NgOptimizedImage} from '@angular/common';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {environment} from '../../../environments/environment';
import {ImdbComponent} from '../../components/imdb/imdb.component';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {WatchListFacade} from '../../api/facade/watch-list.facade';
import { combineLatest, distinctUntilChanged, map, tap } from 'rxjs';
import { MovieId } from '../../api/entities/movies.entity';

@Component({
  selector: 'app-movie-id',
  imports: [
    AsyncPipe,
    NzSpinComponent,
    NgOptimizedImage,
    ImdbComponent,
    NzIconDirective,
    DatePipe
  ],
  templateUrl: './movie-id.component.html',
  styleUrl: './movie-id.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieIdComponent implements OnInit {
  private _router = inject(ActivatedRoute);
  private _moviesFacade = inject(MoviesFacade);
  private _destroyRef = inject(DestroyRef);
  private _watchListFacade = inject(WatchListFacade);



  watchList$ = this._watchListFacade.watchList$;
  movieId$ = this._moviesFacade.movieId$
  isInWatchList$ = combineLatest([this.movieId$, this.watchList$])
    .pipe(
      map(([movieId, watchList]) => !!watchList.data?.results?.find(w => w.id === movieId.data?.id)),
      distinctUntilChanged(),
    )

  isToggling$ = this._watchListFacade.isToggling$;

  ngOnInit() {
    this._router.params.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(params => {
      this._moviesFacade.getMovieById(params['id']);
    })
    this._watchListFacade.getWatchList()
  }

  toggleWatchList(movie: MovieId, isInWatchList: boolean) {
    this._watchListFacade.toggleToWatchList(movie,isInWatchList)
  }

  protected readonly environment = environment;
}
