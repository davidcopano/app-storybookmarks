import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../../interfaces';
import { Subject } from 'rxjs';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loggedUser: User;
  private $userLoginsSubject = new Subject<User>();
  private httpOptions: {
    headers: HttpHeaders
  };
  private readonly USER_STORAGE_KEY: string = 'user';

  constructor(private httpClient: HttpClient) { }

  /**
   * Log in into the application.
   * @param email Email
   * @param password Password
   */
  public login(email: string, password: string) {
    return this.httpClient.post<User>(environment.apiUrl + 'login', { email, password });
  }

  /**
   * Log in with social media data.
   * @param email Email
   * @param username Username
   */
  public socialLogin(email: string, username: string) {
    return this.httpClient.post<User>(environment.apiUrl + 'social-login', { email, username });
  }

  /**
   * Register into the application.
   * @param user User to be created
   */
  public register(user: User) {
    return this.httpClient.post<User>(environment.apiUrl + 'register', user);
  }

  /**
   * Recovers the password of a user email.
   * @param email Email
   */
  public recoverPassword(email: string) {
    return this.httpClient.post(environment.apiUrl + 'forgot-password', { email });
  }

  /**
   * Edit user profile data.
   * @param user User to be edited
   */
  public editProfile(user: User) {
    return this.httpClient.patch<User>(environment.apiUrl + 'edit-profile', user, this.httpOptions);
  }

  /**
   * Sets an authorization token when using user-related methods.
   * @param apiToken API token
   */
  public setAuthToken(apiToken: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`
      })
    };
  }

  /**
   * Creates a new event call when the login is successful.
   * @param user User logged
   */
  public loginSuccessful(user: User) {
    this.$userLoginsSubject.next(user);
  }

  /**
   * Listens when a login is successful.
   */
  public onLoginSuccessful() {
    return this.$userLoginsSubject.asObservable();
  }

  /**
   * Save user data in local storage.
   * @param user User to be saved
   */
  public async saveInLocal(user: User): Promise<User> {
    await Storage.set({
      key: this.USER_STORAGE_KEY,
      value: JSON.stringify(user)
    });
    return Promise.resolve(user);
  }

  /**
   * Get user data from local storage.
   */
  public async getFromLocal(): Promise<User> {
    let { value } = await Storage.get({
      key: this.USER_STORAGE_KEY
    });
    let user: User = JSON.parse(value);
    return Promise.resolve(user);
  }

  /**
   * Log outs of the application.
   */
  public logout() {
    this.loggedUser = null;
    Storage.remove({
      key: this.USER_STORAGE_KEY
    });
  }
}
