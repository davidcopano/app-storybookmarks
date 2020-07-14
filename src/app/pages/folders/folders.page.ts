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

  folders: Folder[] = [];
  private isSearching: boolean = false;

  constructor() { }

  ngOnInit() {
    for (let i = 1; i <= 5; i++) {
      this.folders.push({
        id: i.toString(),
        name: `Carpeta ${i + 1}`,
        color: 'red',
        created_at: new Date().toISOString(),
        user_id: 1
      });
    }
  }

}
