import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';

@Injectable ({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private isAuth = false;
  private timer: any;

  name: string;
  lastname: string;
  email: string;
  zipcode: string;
  id: string;

  constructor (private http: HttpClient, private router: Router) { }

  //  ##### these methods are invoked from the other COMPONENTS #####

  // returns a boolean if logged in "TRUE" if not "FALSE"
  getIsAuth() {
    return this.isAuth;
  }

  // signup
  createUser (email, password, name, lastname, zipcode) {
    const authData: AuthData = { email, password, name , lastname, zipcode};
    this.http.post ('http://localhost:3000/signup', authData)
      .subscribe(res => {
        console.log (res);
      }, error => {
        console.log (error);
      });
  }

  // login
  signin (email: string, password: string) {
    const authData = { email, password };
    this.http
        .post< {
          name: string; lastname: string; myEmail: string; id: string; zipcode: string; token: string; expiresIn: number}
          >('http://localhost:3000/login', authData)
        .subscribe (res => {
          console.log (res);

          const token = res.token;
          const name = res.name;
          const lastname = res.lastname;
          const myEmail = res.myEmail;
          const zipcode = res.zipcode;
          const id = res.id;

          this.token = token;
          this.name = name;
          this.lastname = lastname;
          this.email = myEmail;
          this.zipcode = zipcode;
          this.id = id;

          localStorage.setItem('name', name);
          localStorage.setItem('lname', lastname);
          localStorage.setItem('email', email);
          localStorage.setItem('zipcode', zipcode);
          localStorage.setItem('id', id);

          if (token) {
            const expiresIn = res.expiresIn;
            this.setAuthTimer (expiresIn); // auth timer
            this.isAuth = true; // line 12

            // DATE
            const now = new Date();
            const expiry = new Date (now.getTime());
            this.tokenLocalstorage (token, expiry);

            //navigate
            this.router.navigate (['/main']);
          }
        });
  }

  // timer
  setAuthTimer(duration: number) {
    this.timer = setTimeout(() => {
      alert('you will be logged out in ');
      this.logout();
    }, duration * 200); // 33.3 mins
  }

  // pushing it to the localstorage
  tokenLocalstorage (token: string, expiry: Date) {
    localStorage.setItem ('token', token);
    localStorage.setItem ('expiration', expiry.toISOString());
  }
}
