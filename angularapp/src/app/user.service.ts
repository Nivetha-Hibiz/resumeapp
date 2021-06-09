import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const apiBaseUrl= 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(user: any){
    return this.http.post(apiBaseUrl+'/register',user,this.noAuthHeader);
  }

  login(authCredentials : any) {
    return this.http.post(apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(apiBaseUrl + '/userProfile');
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}