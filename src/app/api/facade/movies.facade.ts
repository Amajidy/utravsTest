import {inject, Injectable} from '@angular/core';
import {MoviesInfra} from '../infra/movies.infra';
import {combineLatest, map, ReplaySubject, switchMap} from 'rxjs';
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
  private _searchedMovies$ = new ReplaySubject<BaseInfra<Movies>>(1)

  get searchedMovies$(){
    return this._searchedMovies$.asObservable()
  }

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

  searchMovie(title: string = '', genre: number | null){
    if (title && genre){
      this.searchMovieByTitleAndGenre(title, genre);
    } else if (title){
      this.searchMovieByTitle(title)
    } else if (genre){
      this.searchMovieByGenre(genre);
    }
  }

  searchMovieByTitleAndGenre(title: string, genre: number){
    this._searchedMovies$.next(new BaseInfra(this._moviesInfra.searchMovieByTitle(title).pipe(
      map((movies) => ({...movies,
        results: movies.results.filter(movie => movie.genre_ids.includes(genre))}))
    )))
  }

  searchMovieByTitle(title: string){
    this._searchedMovies$.next(new BaseInfra(this._moviesInfra.searchMovieByTitle(title)))
  }
  searchMovieByGenre(genre: number){
    this._searchedMovies$.next(new BaseInfra(this._moviesInfra.searchMovieByGenre(genre)))
  }
}
