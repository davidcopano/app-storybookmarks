import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Bookmark, BookmarkPagination } from '../../interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  public bookmarks: Bookmark[] = [];
  public isLoading: boolean = true;
  public loadedBookmarksFirstTime: boolean = false;
  private bookmarkPage: number = 1;
  private $bookmarksLoaded = new Subject();
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

  public getBookmarks() {
    if (!this.loadedBookmarksFirstTime || this.bookmarkPage != 1) {
      this.isLoading = true;
      const bookmarkPagination = this.httpClient.get<BookmarkPagination>(`${environment.apiUrl}bookmarks?page=${this.bookmarkPage}`, this.httpOptions);
      const bookmarksObservable = bookmarkPagination.pipe(map(value => value.data));
      bookmarksObservable.subscribe(bookmarks => {
        this.bookmarks.push(...bookmarks);
        this.isLoading = false;
        this.loadedBookmarksFirstTime = true;
        this.bookmarkPage++;
        this.$bookmarksLoaded.next();
      });
    }
  }

  public onBookmarksLoaded() {
    return this.$bookmarksLoaded.asObservable();
  }

  public setAuthToken(api_token: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_token}`
      })
    };
  }

  public reset() {
    this.bookmarks = [];
    this.isLoading = true;
    this.loadedBookmarksFirstTime = false;
    this.bookmarkPage = 1;
    this.$bookmarksLoaded = new Subject();
  }
}
