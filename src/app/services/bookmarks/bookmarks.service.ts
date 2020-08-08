import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Bookmark, BookmarkPagination } from '../../interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  public bookmarks: Bookmark[] = [];
  public isLoading: boolean = true;
  public loadedFirstTime: boolean = false;
  public order: string = 'default';
  private page: number = 1;
  private $bookmarksLoaded = new Subject();
  private httpOptions: {
    headers: HttpHeaders
  }

  constructor(private httpClient: HttpClient, public userService: UserService) {
    if (userService.loggedUser) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.userService.loggedUser.api_token}`
        })
      };
    }
    else {
      console.error('No hay usuario logeado actualmente - bookmarks.service.ts');
    }
  }

  public get() {
    if (!this.loadedFirstTime || this.page != 1) {
      this.isLoading = true;
      const bookmarkPagination = this.httpClient.get<BookmarkPagination>(`${environment.apiUrl}bookmarks?page=${this.page}&order=${this.order}`, this.httpOptions);
      const bookmarksObservable = bookmarkPagination.pipe(map(value => value.data));
      bookmarksObservable.subscribe(bookmarks => {
        this.bookmarks.push(...bookmarks);
        this.isLoading = false;
        this.loadedFirstTime = true;
        this.page++;
        this.$bookmarksLoaded.next();
      });
    }
  }

  public async add(bookmark: Bookmark) {
    try {
      let createdBookmark = await this.httpClient.post<Bookmark>(`${environment.apiUrl}bookmarks`, bookmark, this.httpOptions).toPromise();
      this.bookmarks.unshift(createdBookmark);
      return { success: true };
    }
    catch (error) {
      return { success: false, error };
    }
  }

  public async edit(bookmark: Bookmark) {
    try {
      let editedBookmark = await this.httpClient.patch<Bookmark>(`${environment.apiUrl}bookmarks/${bookmark.id}`, bookmark, this.httpOptions).toPromise();
      let index = this.bookmarks.findIndex(item => item.id == bookmark.id);
      this.bookmarks[index] = editedBookmark;
      return { success: true };
    }
    catch (error) {
      return { success: false, error };
    }
  }

  public async delete(bookmark: Bookmark) {
    try {
      await this.httpClient.delete<Bookmark>(`${environment.apiUrl}bookmarks/${bookmark.id}`, this.httpOptions).toPromise();
      let index = this.bookmarks.findIndex(item => item.id == bookmark.id);
      this.bookmarks.splice(index, 1);
      return { success: true };
    }
    catch (error) {
      return { success: false, error };
    }
  }

  public onBookmarksLoaded() {
    return this.$bookmarksLoaded.asObservable();
  }

  public setAuthToken(api_token: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${api_token}`
      })
    };
  }

  public reset() {
    this.bookmarks = [];
    this.isLoading = true;
    this.loadedFirstTime = false;
    this.page = 1;
    this.$bookmarksLoaded = new Subject();
  }
}
