import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { LoginUser } from '../../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckEmail } from '../../../validators/common.validator';
import { Router } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  title = 'GameAdm';
  model: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private router: Router, public authService: AuthService) { }
  ngOnInit() {
    this.model = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.model.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.model.invalid) {
      return;
    }
    const objLogin: LoginUser = {
      email: this.model.value.email,
      password: this.model.value.password
    };

    var obj = JSON.stringify(this.model.value);
    console.log('SUCCESS!! :-)\n\n' + obj)
    console.log(objLogin);

    this.authService.login(objLogin).then(() => {
      this.authService.getToken().subscribe(p => {
        var obj:any = p;
        console.log("token: ", obj.token);
        
        localStorage.setItem('token', obj.token);
        this.router.navigate(['/']);
      })
    });
  }

}
