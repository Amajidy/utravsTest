import {inject, Injectable} from '@angular/core';
import {UserInfra} from '../infra/user.infra';
import {BehaviorSubject, firstValueFrom, ReplaySubject, Subject} from 'rxjs';
import {BaseInfra} from '../base.class';
import {User} from '../entities/user.entity';

@Injectable({
  providedIn: 'root',
})
export class UserFacade{
  private _userInfra = inject(UserInfra)
  private _userConfig$ = new ReplaySubject<BaseInfra<User>>(1)

  get userConfig$(){
    return this._userConfig$.asObservable()
  }

  getUser(){
    this._userConfig$.next(new BaseInfra(this._userInfra.getUser()))
  }


}
