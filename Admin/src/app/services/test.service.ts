import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TestService {
  url: string;
  Observable: any;

  constructor(public http: HttpClient) {
    this.url = "https://wanderdrone.appspot.com/"
  }
  fetch() {
    console.log(this.http.get(this.url))
    return this.http.get(this.url)
  }
}
