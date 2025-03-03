import {inject, Injectable} from '@angular/core';
import {MoviesInfra} from '../infra/movies.infra';
import {ReplaySubject} from 'rxjs';
import {BaseInfra} from '../base.class';
import {Genre, MovieId, Movies} from '../entities/movies.entity';

@Injectable({
  providedIn: 'root',
})
export class MoviesFacade {
  private _moviesInfra = inject(MoviesInfra);
  private _popularMovies$ = new ReplaySubject<BaseInfra<Movies>>(1)
  private _movieId$ = new ReplaySubject<BaseInfra<MovieId>>(1)
  private _genres$ = new ReplaySubject<BaseInfra<Genre[]>>(1)

  get genres$(){
    return this._genres$.asObservable()
  }

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

  getGenres(){
    this._genres$.next(new BaseInfra(this._moviesInfra.getGenre()))
  }
}
