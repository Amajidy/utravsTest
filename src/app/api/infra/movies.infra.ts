import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Genre, MovieId, Movies} from '../entities/movies.entity';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesInfra{
  private _http$ = inject(HttpClient);


  getPopularMovies(){
    return this._http$.get<Movies>(environment.apiUrl + '/movie/popular').pipe(
      map(res => ({
        ...res, results:res.results.map(movies => ({
          ...movies, poster_path: environment.mediaUrl + movies.poster_path,
          backdrop_path: environment.mediaUrl + movies.backdrop_path
        }))
      }))
    )
  }
  getMovieById(id:number){
    return this._http$.get<MovieId>(environment.apiUrl + `/movie/${id}`).pipe(
      map(res => ({...res, poster_path: environment.mediaUrl + res.poster_path,
        backdrop_path: environment.mediaUrl + res.backdrop_path}))
    )
  }

  getGenre(): Observable<Genre[]> {
    return this._http$.get<{ genres: Genre[] }>(environment.apiUrl + '/genre/movie/list').pipe(
      map(res => res.genres)
    )
  }

  searchMovieByTitle(title:string){
    return this._http$.get<Movies>(environment.apiUrl + `/search/movie?query=${title}`).pipe(
      map(res => ({
        ...res, results:res.results.map(movies => ({
          ...movies, poster_path: environment.mediaUrl + movies.poster_path,
          backdrop_path: environment.mediaUrl + movies.backdrop_path
        }))
      }))
    )
  }

  searchMovieByGenre(genre:number){
    return this._http$.get<Movies>(environment.apiUrl + `/discover/movie?with_genres=${genre}`).pipe(
      map(res => ({
        ...res, results:res.results.map(movies => ({
          ...movies, poster_path: environment.mediaUrl + movies.poster_path,
          backdrop_path: environment.mediaUrl + movies.backdrop_path
        }))
      }))
    )
  }
}
