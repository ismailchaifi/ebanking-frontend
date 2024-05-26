import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;
  username: any;
  roles: any;
  accessToken!: string;

  constructor(private router: Router, private http: HttpClient) { }

  public login(username: string, password: string) {
    let params = new HttpParams().set("username", username).set("password", password)
    let options= {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }
    return this.http.post(environment.backendHost + "/auth/login", params, options)
  }

  loadProfile(data: any) {
    this.isAuthenticated = true;
    this.accessToken = data['access-token'];
    let decodedJwt = jwtDecode(this.accessToken);
    this.username = decodedJwt.sub;
    // @ts-ignore
    this.roles = decodedJwt.scope;
    window.localStorage.setItem("jwt-token", this.accessToken);
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = "";
    this.username = undefined;
    this.roles = undefined;
    window.localStorage.removeItem('jwt-token')
    this.router.navigateByUrl("/login");
  }

  loadJwtTokenFromLocalStorage() {
    let token = window.localStorage.getItem('jwt-token');
    if (token) {
      this.loadProfile({"access-token": token});
      this.router.navigateByUrl("/admin/customers")
    }
  }
}
