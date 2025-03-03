import {firstValueFrom, Observable} from 'rxjs';
import {signal} from '@angular/core';

export class BaseInfra<TData> {
  private _isLoading = signal(false);
  private _hasError = false;
  private _data = signal<TData | undefined>(undefined);
  private readonly _action: Promise<TData>;

  get action(){
    return this._action;
  }

  get data(): TData | undefined {
    return this._data();
  }

  get isLoading(): boolean {
    return this._isLoading();
  }

  get hasError(): boolean {
    return this._hasError;
  }

  constructor(action$: Observable<TData>) {
    this._isLoading.set(true);
    // this.action = action$.pipe(
    //   tap((data: TData) => {
    //     this._data.set(data);
    //     this._hasError.set(false);
    //   }),
    //   catchError((err: any) => {
    //     this._hasError.set(true);
    //     // Error handelning => ...
    //     return throwError(() => new Error(err));
    //   }),
    //   finalize(() => {
    //     this._isLoading.set(false);
    //   })
    // );
    this._action = firstValueFrom(action$).then(res => {
      this._data.set(res)
      return res;
    })
      .catch(err => {
        this._hasError = true;
        throw Error(err);
      })
      .finally(() => {
        this._isLoading.set(false)
      })
  }
}
