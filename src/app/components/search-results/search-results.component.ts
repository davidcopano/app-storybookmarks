import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Bookmark, Folder } from '../../interfaces';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {

  @Input() query: string;

  public bookmarks: Bookmark[] = [];
  public folders: Folder[] = [];

  constructor() { }

  ngOnInit() {
    for (let i = 1; i <= 5; i++) {
      this.bookmarks.push({
        id: i.toString(),
        color: 'red',
        created_at: new Date().toISOString(),
        folder_id: null,
        public: false,
        title: `Marcador ${i}`,
        url: 'https://www.google.es',
        user_id: 2,
        expiration_date: null,
        note: null,
        tag_id: null
      });
    }

    for (let i = 1; i <= 5; i++) {
      this.folders.push({
        id: i.toString(),
        name: `Carpeta ${i}`,
        color: 'red',
        created_at: new Date().toISOString(),
        user_id: 1
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.query = changes.query.currentValue;
  }
}
