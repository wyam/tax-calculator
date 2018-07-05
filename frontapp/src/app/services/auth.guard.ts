import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState, selectAuthState} from '../store/app.states';

@Injectable()
export class AuthGuard implements CanActivate {

  getState: Observable<any>;

  constructor(
    private store: Store<AppState>,
    private myRoute: Router
  ) {
    this.getState = this.store.select(selectAuthState);
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.getState.map((state) => {
      if (state.isAuthenticated) {
        return true;
      }
      this.myRoute.navigate(['signin']);
      return false;
    });
  }
}
