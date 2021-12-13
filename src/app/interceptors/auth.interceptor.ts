import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/authservice.service';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  constructor(private auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(catchError(error => {
      if(error instanceof HttpErrorResponse && !request.url.includes('auth/signin') && error.status === 401){
        if(!this.isRefreshing){
          this.isRefreshing = true;

          return from(this.auth.updateUserToken())
          .pipe(
            switchMap(res => {  
              if(res.updated == true){
                return next.handle(this.addTokenHeader(request, res.token))
              } else{
                this.auth.doLogOut().then(val => {
                  this.router.navigateByUrl('/home');
                })
              }         
              
            })
          )

        }
      }

      if(!request.url.includes('auth/signin') && error.error.status === 501 && error.error.message.includes("Decoding Firebase ID token failed.")){
        if(!this.isRefreshing){
          this.isRefreshing = true;

          return from(this.auth.updateUserToken())
          .pipe(
            switchMap(res => {  
              if(res.updated == true){
                return next.handle(this.addTokenHeader(request, res.token))
              } else{
                this.auth.doLogOut().then(val => {
                  this.router.navigateByUrl('/home');
                })
              }         
              
            })
          )
        }
      }

      return throwError(error);
    }))
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {

    /* for Node.js Express back-end */
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, token) });
  }
}
