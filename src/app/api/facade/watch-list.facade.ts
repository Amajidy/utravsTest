import {inject, Injectable} from '@angular/core';
import {WatchListInfra} from '../infra/watch-list.infra';
import {UserFacade} from './user.facade';
import {BehaviorSubject, delay, firstValueFrom, ReplaySubject} from 'rxjs';
import {BaseInfra} from '../base.class';
import {NzMessageService} from 'ng-zorro-antd/message';
import {WatchList} from '../entities/watchList.entity';
import { MovieId } from '../entities/movies.entity';

@Injectable({
  providedIn: 'root'
})
export class WatchListFacade{
  private _watchList = inject(WatchListInfra)
  private _userFacade = inject(UserFacade);
  private _messageService = inject(NzMessageService)
  private _userConfig$ = this._userFacade.userConfig$
  private _watchList$ = new ReplaySubject<BaseInfra<WatchList>>(1)
  private _isToggling$ = new BehaviorSubject<boolean>(false)
  isToggling$ = this._isToggling$.asObservable();

  get watchList$(){
    return this._watchList$.asObservable()
  }


   toggleToWatchList(movie: MovieId,isInWatchList: boolean){
    this._isToggling$.next(true)
    firstValueFrom(this._userConfig$).then(async (res) => {
      if (res.data){
        const isAdded = new BaseInfra(!isInWatchList ? this._watchList.addMovieFromWatchList(res.data.id, movie.id) : this._watchList.removeMovieFromWatchList(res.data.id, movie.id))
        if (!isAdded.hasError){

        /**
         *
         * when adding or removing a movie from watchlist, it takes a little time
         * to be added to the backend. So that a simulated delay can solve the backend shortage
         */
          setTimeout(() => {
            this.getWatchList()
            this._isToggling$.next(false)
          },2000)
        this._messageService.success('Operation in progress!. please wait a few seconds');
        } else {
          this._messageService.error('Failed!');
        }
      }
    })
  }

  getWatchList(){
    firstValueFrom(this._userConfig$).then((res) => {
      if (res.data){
        const response = new BaseInfra(this._watchList.getMoviesWatchlist(res.data.id))
        this._watchList$.next(response)
      }
    })
  }

  async removeFromWatchList(id:number){
    const res = await firstValueFrom(this._userConfig$)
    if (res.data){
      const response = new BaseInfra(this._watchList.removeMovieFromWatchList(res.data.id, id))
      if (!response.hasError){
        this._messageService.success('Movie removed successfully!');
        const watchList = await firstValueFrom(this.watchList$)
        if (watchList.data){
          watchList.data.results = watchList.data.results.filter((movies) => movies.id !== id)
          this._watchList$.next(watchList)
        }
      } else {
        this._messageService.error('Movie removed failed');
      }

    }
  }
}
