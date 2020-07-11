import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../../interfaces';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
})
export class BookmarksPage implements OnInit {

  bookmarks: Bookmark[] = [];

  constructor() { }

  ngOnInit() {
    for(let i = 1; i <= 5; i++) {
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

}
