import {inject, Pipe, PipeTransform} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Pipe({
  name: 'authorImg'
})
export class AuthorImgPipe implements PipeTransform {
  private _http$ = inject(HttpClient);
  callRequest(url: string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${environment.apiKey}`
    });
    return this._http$.get(url, {headers})
  }


  transform(value: string): string {
    // console.log(value)
    this.callRequest(value).subscribe(console.log)
    // return this.callRequest(value);
    return value;
  }
}
