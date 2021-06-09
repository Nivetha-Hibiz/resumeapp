import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:4000/form';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
   
  email : any;
  constructor(private http: HttpClient) { }

  setEmail(email : any){
    this.email=email
  }

  getEmail(){
    return this.email;
  }

  getAll() {
    return this.http.get(baseUrl);
  }

  get(id : any) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  getemail(email : any) {
    return this.http.get(`${baseUrl}/${email}`);
  }

  create(data: any) {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll() {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any) {
    return this.http.get(`${baseUrl}?title=${title}`);
  }
}
