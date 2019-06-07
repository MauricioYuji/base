import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from '../services/auth.service';

@Injectable()


export class AuthGuard implements CanActivate {

  constructor(private loginService: AuthService, private router: Router) { }


  canActivate(): Observable<boolean> {
    var user = sessionStorage.getItem("user");
    if (user != null) {
      return this.loginService.getToken().pipe(map(p => {
        console.log("p: ", p);
        if (p != null) {
          var item: any = p;
          var obj = { user: JSON.parse(user).user, token: item.token };
          sessionStorage.setItem("user", JSON.stringify(obj));
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }));
    } else {
      console.log("LOGOUT");

      this.router.navigate(['/login']);
      return new Observable(o => o.next(false));
    }
    //return this.loginService.user.pipe(map(p => {
    //  if (p != null) {
    //    return true;
    //  } else {
    //    this.router.navigate(['/login']);
    //    return false;
    //  }
    //}));
  }
}
