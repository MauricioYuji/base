import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
class Game {
  constructor(public nome) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GameAdm';
  constructor(public afAuth: AngularFireAuth) {
  }
  ngOnInit() {
  }
  login() {
    this.afAuth.auth.signInWithPopup(new auth.EmailAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
