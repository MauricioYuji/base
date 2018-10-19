import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
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
  email: string;
  password: string;

  constructor(public authService: AuthService) { }
  ngOnInit() {

  }
  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }
}
