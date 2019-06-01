import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from '../services/auth.service';

@Injectable()


export class AuthGuard implements CanActivate {

  constructor(private loginService: AuthService, private router: Router) { }


  canActivate(): Observable<boolean> {
    return this.loginService.user.pipe(map(p => {
      if (p != null) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }));
  }
}
