import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  title = 'GameAdm';
  email: string;
  password: string;


  constructor(public authService: AuthService) { }
  ngOnInit() {

  }
  login() {
    console.log("this.email:", this.email);
    console.log("this.password:", this.password);
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }
  
}
