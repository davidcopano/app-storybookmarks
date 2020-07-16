import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../../models';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loggedUser: User;
  private readonly USER_STORAGE_KEY: string = 'user';

  constructor(private httpClient: HttpClient, private storage: Storage) { }

  public login(email: string, password: string) {
    return this.httpClient.post<User>(environment.apiUrl + 'login', { email: email, password: password });
  }

  public saveInLocal(user: User): Promise<User> {
    return this.storage.set(this.USER_STORAGE_KEY, user);
  }

  public getFromLocal(): Promise<User> {
    return this.storage.get(this.USER_STORAGE_KEY);
  }

  public logout() {
    this.loggedUser = null;
    this.storage.remove(this.USER_STORAGE_KEY);
  }
}
