import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
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


  constructor(public authService: AuthService) { }
  ngOnInit() {

  }

  logout() {
    this.authService.logout();
  }
  
}
