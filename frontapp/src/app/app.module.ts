import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatInputModule, MatListModule, MatTableModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { TaxComponent } from './components/tax/tax.component';
import { RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';

import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { reducers } from './store/app.states';
import {ErrorInterceptor, TokenInterceptor} from './services/token.interceptor';
import {TaxService} from './services/tax.service';
import {AuthGuard} from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    TaxComponent,
    MainComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    RouterModule.forRoot([
      { path: 'tax', component: TaxComponent, canActivate: [AuthGuard] },
      { path: 'signin', component: SigninComponent },
      { path: '', component: MainComponent },
      { path: '**', redirectTo: '/' }
    ])
  ],
  providers: [
    AuthGuard,
    AuthService,
    TaxService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [MatButtonModule, MatInputModule],
})
export class AppModule { }
