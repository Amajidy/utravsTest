import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Movies} from '../entities/movies.entity';
import {WatchList} from '../entities/watchList.entity';

@Injectable({
  providedIn: 'root',
})
export class WatchListInfra{
  private _http$ = inject(HttpClient);


  removeMovieFromWatchList(accountId: number, movieId: number){
    return this._http$.post(environment.apiUrl + `/account/${accountId}/watchlist`, {
      media_type: "movie",
      media_id: movieId,
      watchlist: false
    })
  }

  addMovieFromWatchList(accountId: number, movieId: number){
    return this._http$.post(environment.apiUrl + `/account/${accountId}/watchlist`, {
      media_type: "movie",
      media_id: movieId,
      watchlist: true
    })
  }

  getMoviesWatchlist(accountId: number){
    return this._http$.get<WatchList>(environment.apiUrl + `/account/${accountId}/watchlist/movies`)
  }


  removeSeriesFromWatchList(){

  }
}
