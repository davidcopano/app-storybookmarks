import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Bookmark, BookmarkPagination } from '../../interfaces';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { UtilitiesService } from '../utilities/utilities.service';

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

  constructor(private httpClient: HttpClient, public userService: UserService, private utilitiesService: UtilitiesService) {
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
      await this.httpClient.post<Bookmark>(`${environment.apiUrl}bookmarks`, bookmark, this.httpOptions).toPromise();
      this.bookmarks.unshift(bookmark);
      return { success: true };
    }
    catch(error) {
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
        'Authorization': `Bearer ${api_token}`
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
