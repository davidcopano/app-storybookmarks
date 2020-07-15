import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonSearchbar } from '@ionic/angular';
import { Folder } from '../../interfaces';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.page.html',
  styleUrls: ['./folders.page.scss'],
})
export class FoldersPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonSearchbar) searchBar: IonSearchbar;

  public folders: Folder[] = [];
  public isSearching: boolean = false;
  public searchTerm: string;

  constructor() { }

  ngOnInit() {
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

  public loadMoreFolders($event) {
    setTimeout(() => {
      for (let i = 1; i <= 5; i++) {
        this.folders.push({
          id: i.toString(),
          name: `Carpeta ${i}`,
          color: 'red',
          created_at: new Date().toISOString(),
          user_id: 1
        });
      }
      $event.target.complete();

      if (this.folders.length == 50) {
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
