import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { AuthService } from '@auth0/auth0-angular';
 
// import { AuthenticationService } from '../services/authentication-service.service';
import { AuthService } from '../services/authservice.service';
 
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
constructor(
private router: Router,
private authenticationService: AuthService
) {}
 
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
const currentUser = this.authenticationService.getCurrentUser();
if (currentUser) {
// authorised so return true
return true;
}
 
// not logged in so redirect to login page
// this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
// return false;
}
}