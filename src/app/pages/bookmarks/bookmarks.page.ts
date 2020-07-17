import { Component, OnInit, ViewChild } from '@angular/core';
import { Bookmark } from '../../interfaces';
import { IonInfiniteScroll, IonSearchbar } from '@ionic/angular';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';

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
  public isSearching: boolean = false;
  public searchTerm: string;

  constructor(public bookmarksService: BookmarksService) { }

  ngOnInit() {
    this.bookmarksService.getBookmarks();
  }

  loadMoreBookmarks($event) {
    setTimeout(() => {
      for (let i = 1; i <= 5; i++) {
        this.bookmarks.push({
          id: i.toString(),
          color: 'red',
          created_at: new Date().toISOString(),
          folder_id: null,
          public: false,
          title: `Carpeta ${i}`,
          url: 'https://www.google.es',
          user_id: 2,
          expiration_date: null,
          note: null,
          tag_id: null
        });
      }
      $event.target.complete();

      if(this.bookmarks.length == 50) {
        this.infiniteScroll.disabled = true;
      }
    }, 500);
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
}
