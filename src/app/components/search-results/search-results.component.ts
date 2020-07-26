import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Bookmark, Folder } from '../../interfaces';
import { SearchResultsService } from 'src/app/services/search-results/search-results.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {

  @Input() query: string;

  public bookmarks: Bookmark[] = [];
  public folders: Folder[] = [];
  public isSearching: boolean = false;

  constructor(private searchResultsService: SearchResultsService) { }

  ngOnInit() { }

  async ngOnChanges(changes: SimpleChanges) {
    this.query = changes.query.currentValue;
    if (this.query.length >= 3) {
      this.bookmarks = [];
      this.folders = [];
      this.isSearching = true;
      let { bookmarks, folders } = await this.searchResultsService.get(this.query);
      this.bookmarks = bookmarks;
      this.folders = folders;
      this.isSearching = false;
    }
  }
}
