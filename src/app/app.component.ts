import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {UserFacade} from './api/facade/user.facade';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {environment} from '../environments/environment';
import {slideInAnimation} from './pages/animation.route';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AsyncPipe,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  private _userFacade = inject(UserFacade);
   _router = inject(ActivatedRoute);
  user$ = this._userFacade.userConfig$;
  napShot = this._router.snapshot.data
  ngOnInit() {
    // this._userFacade.getUser()
  }

  protected readonly environment = environment;
}
