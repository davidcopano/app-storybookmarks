import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL = 'https://api.storybookmarks.dcopano.xyz/'

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post(this.API_URL + 'login', { email: email, password: password });
  }
}
