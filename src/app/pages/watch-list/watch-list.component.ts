import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {WatchListFacade} from '../../api/facade/watch-list.facade';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {environment} from '../../../environments/environment';
import {ImdbComponent} from '../../components/imdb/imdb.component';
import {NzIconDirective} from 'ng-zorro-antd/icon';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-watch-list',
  imports: [
    AsyncPipe,
    NzSpinComponent,
    ImdbComponent,
    NzIconDirective,
    RouterLink
  ],
  templateUrl: './watch-list.component.html',
  styleUrl: './watch-list.component.scss'
})
export class WatchListComponent implements OnInit {
  private _watchListFacade = inject(WatchListFacade);
  watchList$ = this._watchListFacade.watchList$;

  ngOnInit(){
    this._watchListFacade.getWatchList()
  }

  removeWatchList(id:number){
    this._watchListFacade.removeFromWatchList(id)
  }

  protected readonly environment = environment;
}
