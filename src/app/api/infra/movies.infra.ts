import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MovieId, Movies} from '../entities/movies.entity';

@Injectable({
  providedIn: 'root'
})
export class MoviesInfra{
  private _http$ = inject(HttpClient);


  getPopularMovies(){
    return this._http$.get<Movies>(environment.apiUrl + '/movie/popular')
  }
  getMovieById(id:number){
    return this._http$.get<MovieId>(environment.apiUrl + `/movie/${id}`)
  }
}
