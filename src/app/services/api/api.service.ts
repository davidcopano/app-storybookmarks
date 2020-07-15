import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public API_URL = 'https://api.storybookmarks.dcopano.xyz/'

  constructor(public httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post(this.API_URL + 'login', { email: email, password: password });
  }
}
