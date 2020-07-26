import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Bookmark, Folder } from 'src/app/interfaces';
import { FoldersService } from 'src/app/services/folders/folders.service';

@Component({
  selector: 'app-view-folder-bookmarks',
  templateUrl: './view-folder-bookmarks.page.html',
  styleUrls: ['./view-folder-bookmarks.page.scss'],
})
export class ViewFolderBookmarksPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public folder: Folder;
  public bookmarks: Bookmark[] = [];
  public isLoading: boolean = true;
  private page: number = 1;

  constructor(private foldersService: FoldersService) { }

  async ngOnInit() {
    this.folder = history.state.folder;
    this.bookmarks = await this.foldersService.getBookmarksById(this.folder, this.page);
    this.isLoading = false;
  }

  async loadMoreBookmarks($event) {
    this.page++;
    let newBookmarks = await this.foldersService.getBookmarksById(this.folder, this.page);
    this.bookmarks.push(...newBookmarks);
    $event.target.complete();
    if(newBookmarks.length === 0) {
      this.infiniteScroll.disabled = true;
    }
  }

}
