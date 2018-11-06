import { Observable } from "rxjs";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from '../services/auth.service';

@Injectable()


export class AuthGuard implements CanActivate {

  constructor(private loginService: AuthService, private router: Router) { }

  
  canActivate() {
    //console.log('check login:', this.loginService.checklogin());
    //console.log('check user:', this.loginService.user());

    if (this.loginService.checklogin()) {
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
    //return this.loginService.user().map(e => {
    //  if (e) {
    //    return true;
    //  }
    //}).catch(() => {
    //  this.router.navigate(['/login']);
    //  return false;
    //});
  }
}
