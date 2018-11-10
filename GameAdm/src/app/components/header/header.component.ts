import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public menuStatus: boolean = false;
  constructor(private router: Router, public authService: AuthService) {
  }
  ngOnInit(): void {
  }
  toggleMenu() {
    this.menuStatus = !this.menuStatus;
  }
  goToRoute(route: string) {
    this.router.navigateByUrl(route);
    this.toggleMenu();
  }

  logout() {
    this.authService.logout();
  }
}
