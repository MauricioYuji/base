import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseAuth } from 'angularfire2';
import { Router } from '@angular/router';
import { LoginUser } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';


@Injectable()
export class AuthService {
  user: Observable<any>;
  islogged: boolean = false;
  private baseUrl = 'http://localhost:3000';

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private http: HttpClient, private base: BaseService) {
    this.user = new Observable(o => o.next(sessionStorage.getItem('user')));
  }
  checklogin(): boolean {
    this.user
      .subscribe(p => this.islogged = (p != null));
    //return this.user.pipe(map(p => {
    //  return p != null;
    //}));
    return true;
  }
  public getToken(): Observable<any> {
    var storage = sessionStorage.getItem('user');

    //console.log("storage: ", storage);
    var obj = {};
    if (storage != undefined && storage != null) {
      obj = { "username": JSON.parse(storage).user };
    };
    console.log("obj: ", obj);
    return this.base.post(this.baseUrl + "/token", obj) as Observable<any>;

  }
  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(obj: LoginUser): Observable<any> {

    var obj = { "password": obj.password, "username": obj.username };
    return this.http.post(this.baseUrl + "/login", obj).pipe(map((objResp) => {
      var u: any = objResp;
      //console.log("token: ", u.token);
      //console.log("u: ", JSON.parse(u.data).id);


      var token = JSON.parse(u.data).id + "\/" + u.token;
      var user = { user: obj.username, token: token, id: JSON.parse(u.data).id };
      sessionStorage.setItem('user', JSON.stringify(user));
      this.user = new Observable(o => o.next(user));


      return this.user;
    }));

    //return this.firebaseAuth
    //  .auth
    //  .signInWithEmailAndPassword(obj.email, obj.password)
    //  .then(() => {
    //    //this.router.navigate(['/']);
    //    console.log('Nice, it worked!');
    //    return true;
    //  })
    //  .catch(err => {
    //    console.log('Something went wrong:', err.message);
    //    return false;
    //  });
  }


  loginfirebase(obj: LoginUser) {
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(obj.username, obj.password)
      .then(() => {
        //this.router.navigate(['/']);
        console.log('Nice, it worked!');
        return true;
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        return false;
      });
  }

  logout() {
    //this.firebaseAuth
    //  .auth
    //  .signOut();
    this.user = null;
    this.router.navigate(['/login']);
  }

}
