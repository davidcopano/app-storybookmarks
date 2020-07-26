import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SearchResult } from 'src/app/interfaces/folders/SearchResult';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {

  private httpOptions: {
    headers: HttpHeaders
  }

  constructor(private httpClient: HttpClient, public userService: UserService) {
    if (userService.loggedUser) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.userService.loggedUser.api_token}`
        })
      };
    }
    else {
      console.error('No hay usuario logeado actualmente - bookmarks.service.ts');
    }
  }

  public get(query: string) {
    return this.httpClient.get<SearchResult>(`${environment.apiUrl}search?query=${query}`, this.httpOptions).toPromise();
  }

  public setAuthToken(api_token: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_token}`
      })
    };
  }
}
