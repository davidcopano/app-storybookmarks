import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Bookmark } from 'src/app/interfaces';

@Component({
  selector: 'app-view-folder-bookmarks',
  templateUrl: './view-folder-bookmarks.page.html',
  styleUrls: ['./view-folder-bookmarks.page.scss'],
})
export class ViewFolderBookmarksPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  bookmarks: Bookmark[] = [];

  constructor() { }

  ngOnInit() {
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

      if (this.bookmarks.length == 50) {
        this.infiniteScroll.disabled = true;
      }
    }, 500);
  }

}
