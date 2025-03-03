import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class UserInfra{
  private _http$ = inject(HttpClient);
  getUser(){
    return this._http$.get<User>(environment.apiUrl + '/account/21854317')
  }
}
