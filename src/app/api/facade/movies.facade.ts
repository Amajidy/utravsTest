import {inject, Injectable} from '@angular/core';
import {MoviesInfra} from '../infra/movies.infra';
import {ReplaySubject} from 'rxjs';
import {BaseInfra} from '../base.class';
import {MovieId, Movies} from '../entities/movies.entity';

@Injectable({
  providedIn: 'root',
})
export class MoviesFacade {
  private _moviesInfra = inject(MoviesInfra);
  private _popularMovies$ = new ReplaySubject<BaseInfra<Movies>>(1)
  private _movieId$ = new ReplaySubject<BaseInfra<MovieId>>(1)

  get popularMovies$(){
    return this._popularMovies$.asObservable();
  }

  get movieId$(){
    return this._movieId$.asObservable();
  }

  getPopularMovies(){
    this._popularMovies$.next(new BaseInfra(this._moviesInfra.getPopularMovies()))
  }

  getMovieById(id:number){
    this._movieId$.next(new BaseInfra(this._moviesInfra.getMovieById(id)))
  }
}
