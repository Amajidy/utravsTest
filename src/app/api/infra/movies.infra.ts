import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MovieId, Movies} from '../entities/movies.entity';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesInfra{
  private _http$ = inject(HttpClient);


  getPopularMovies(){
    return this._http$.get<Movies>(environment.apiUrl + '/movie/popular').pipe(
      map(res => res.results.map(movies => ({...movies, poster_path: environment.mediaUrl + movies.poster_path,
        backdrop_path: movies.backdrop_path})))
    )
  }
  getMovieById(id:number){
    return this._http$.get<MovieId>(environment.apiUrl + `/movie/${id}`).pipe(
      map(res => ({...res, poster_path: environment.mediaUrl + res.poster_path,
        backdrop_path: res.backdrop_path}))
    )
  }
}
