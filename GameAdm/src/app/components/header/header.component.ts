import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public menuStatus: boolean = false;
  constructor(private router: Router) {
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
}
