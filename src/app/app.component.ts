import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {UserFacade} from './api/facade/user.facade';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AsyncPipe,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private _userFacade = inject(UserFacade);
  user$ = this._userFacade.userConfig$
  ngOnInit() {
    // this._userFacade.getUser()
  }

  protected readonly environment = environment;
}
