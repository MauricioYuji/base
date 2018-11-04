import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
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


}


