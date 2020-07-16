import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../../models';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loggedUser: User;
  private $userLoginsSubject = new Subject<User>();
  private readonly USER_STORAGE_KEY: string = 'user';

  constructor(private httpClient: HttpClient, private storage: Storage) { }

  public login(email: string, password: string) {
    return this.httpClient.post<User>(environment.apiUrl + 'login', { email: email, password: password });
  }

  public loginSuccessful(user: User) {
    this.$userLoginsSubject.next(user);
  }

  public onLoginSuccessful() {
    return this.$userLoginsSubject.asObservable();
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
