import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    // redirect to login page if no token presents
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout().subscribe(data => {
      if (data.status === 200) {
        this.router.navigate(['login']);
      }
    })
  }

}
