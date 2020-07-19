import { Component, OnInit, ViewChild } from '@angular/core';
import { Bookmark } from '../../interfaces';
import { IonInfiniteScroll, IonSearchbar } from '@ionic/angular';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
})
export class BookmarksPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonSearchbar) searchBar: IonSearchbar;

  public bookmarks: Bookmark[] = [];
  public bookmarksOrder: string = 'default';
  public onBookmarksLoadedSubscription: Subscription;
  public isSearching: boolean = false;
  public searchTerm: string;

  constructor(public bookmarksService: BookmarksService) { }

  ngOnInit() {
    if (!this.bookmarksService.loadedBookmarksFirstTime) {
      this.bookmarksService.getBookmarks();
    }
  }

  loadMoreBookmarks($event) {
    this.bookmarksService.getBookmarks(this.bookmarksOrder);
    this.onBookmarksLoadedSubscription = this.bookmarksService.onBookmarksLoaded().subscribe(() => {
      $event.target.complete();
      this.onBookmarksLoadedSubscription.unsubscribe();
    });
  }

  loadBookmarksByOrder() {
    this.bookmarksService.reset();
    this.bookmarksService.getBookmarks(this.bookmarksOrder);
  }

  search($event) {
    let value = $event.target.value;
    this.searchTerm = value;
  }

  showSearchbar() {
    this.isSearching = true;
    this.searchBar.setFocus();
  }

  hideSearchbar() {
    this.isSearching = false;
  }

  identifyBookmark(index, item: Bookmark) {
    return item.id;
  }
}
