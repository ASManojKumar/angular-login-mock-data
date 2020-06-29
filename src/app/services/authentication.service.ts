import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

const users = [{ id: 1, firstName: 'Manoj', lastName: 'Kumar', username: 'manoj', password: 'manoj' }];

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private cookieService: CookieService) { }

  login(body) {
    return this.authenticate(body).pipe(map(user => {
      this.cookieService.set('token', 'loggedin', new Date(new Date().setFullYear(new Date().getFullYear() + 1)), '/');
      return user;
    }));
  }

  authenticate(body) {
    const { username, password } = body;
    const user = users.find(x => x.username === username && x.password === password);
    if (!user) {
      return this.error('Username or password is incorrect');
    };
    return this.success({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    })
  }

  // success code and body
  success(body?) {
    return of(new HttpResponse({ status: 200, body }))
  }

  // for error handling
  error(error?) {
    return throwError({ error: { error } });
  }

  // clear cookie during logout
  logout() {
    this.cookieService.delete('token');
    return this.success('Logged out successfully');
  }

  // default login check if cookie is present already
  public isAuthenticated(): boolean {
    const value = this.cookieService.get('token');
    if (value) {
      return true;
    }
    return false;
  }

}
