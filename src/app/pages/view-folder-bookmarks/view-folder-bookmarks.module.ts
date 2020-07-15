import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ViewFolderBookmarksPageRoutingModule } from './view-folder-bookmarks-routing.module';
import { ViewFolderBookmarksPage } from './view-folder-bookmarks.page';
import { BookmarkComponent } from 'src/app/components/bookmark/bookmark.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFolderBookmarksPageRoutingModule,
    TranslateModule
  ],
  entryComponents: [BookmarkComponent],
  declarations: [ViewFolderBookmarksPage, BookmarkComponent]
})
export class ViewFolderBookmarksPageModule {}
