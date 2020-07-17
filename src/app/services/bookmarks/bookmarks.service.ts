import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Bookmark, BookmarkPagination } from '../../interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {

  public bookmarks: Bookmark[] = [];
  private httpOptions: {
    headers: HttpHeaders
  }

  constructor(private httpClient: HttpClient, public userService: UserService) {
    if(userService.loggedUser) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.userService.loggedUser.api_token}`
        })
      };
    }
    else {
      console.error('No hay usuario logeado actualmente - bookamrks.service.ts');
    }
  }

  public getBookmarks(page = 1) {

    console.log('getBookmarks(), httpOptions = ');
    console.log(this.httpOptions);

    const bookmarkPagination = this.httpClient.get<BookmarkPagination>(`${environment.apiUrl}bookmarks?page=${page}`, this.httpOptions);
    const bookmarksObservable = bookmarkPagination.pipe(map(value => value.data));
    bookmarksObservable.subscribe(bookmarks => {
      this.bookmarks.push(...bookmarks);

      console.log('bookmarks = ');
      console.log(this.bookmarks);
    });
  }
}
