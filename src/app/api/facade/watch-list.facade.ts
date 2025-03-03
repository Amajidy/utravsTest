import {inject, Injectable} from '@angular/core';
import {WatchListInfra} from '../infra/watch-list.infra';
import {UserFacade} from './user.facade';
import {firstValueFrom, ReplaySubject} from 'rxjs';
import {BaseInfra} from '../base.class';
import {NzMessageService} from 'ng-zorro-antd/message';
import {WatchList} from '../entities/watchList.entity';

@Injectable({
  providedIn: 'root'
})
export class WatchListFacade{
  private _watchList = inject(WatchListInfra)
  private _userFacade = inject(UserFacade);
  private _messageService = inject(NzMessageService)
  private _userConfig$ = this._userFacade.userConfig$
  private _watchList$ = new ReplaySubject<BaseInfra<WatchList>>(1)

  get watchList$(){
    return this._watchList$.asObservable()
  }

  addMovieToWatchList(id: number){
    firstValueFrom(this._userConfig$).then((res) => {
      if (res.data){
        const isAdded = new BaseInfra(this._watchList.addMovieFromWatchList(res.data.id, id))
        if (!isAdded.hasError){
          this._messageService.success('Movie added successfully');
        } else {
          this._messageService.error('Movie added failed');
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
