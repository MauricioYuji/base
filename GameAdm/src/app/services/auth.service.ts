import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseAuth } from 'angularfire2';
import { Router } from '@angular/router';
import { LoginUser } from '../models/user.model';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  islogged: boolean = false;
  private baseUrl = 'http://localhost:3000';

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private http: HttpClient) {
    this.user = firebaseAuth.authState;
  }
  checklogin(): boolean {
    this.user
      .subscribe(p => this.islogged = (p != null));
    //return this.user.pipe(map(p => {
    //  return p != null;
    //}));
    return true;
  }
  public getToken(): Observable<string> {
    var obj = { "password": "password", "username": "admin" };
    return this.http.post(this.baseUrl + "/login", obj) as Observable<string>;

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

  login(obj: LoginUser) {
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(obj.email, obj.password)
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
    this.firebaseAuth
      .auth
      .signOut();
    this.router.navigate(['/login']);
  }

}
