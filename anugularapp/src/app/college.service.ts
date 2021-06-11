import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

const baseUrl = 'college';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {

 
  email : any;
  constructor(private http: HttpClient) { }

 

  create(data: any) {
    return this.http.post(`college/colleges/district`, data);
  }


  state(){
    return this.http.get(`college/colleges/total`);
  }

  district(data: any){
    return this.http.post(`college/colleges/state`, data);
  }
}
