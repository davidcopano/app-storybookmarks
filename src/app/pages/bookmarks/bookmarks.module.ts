import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { BookmarksPageRoutingModule } from './bookmarks-routing.module';
import { BookmarksPage } from './bookmarks.page';
import { BookmarkComponent } from 'src/app/components/bookmark/bookmark.component';
import { SearchResultsComponent } from 'src/app/components/search-results/search-results.component';
import { FolderComponent } from 'src/app/components/folder/folder.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BookmarksPageRoutingModule,
    TranslateModule
  ],
  entryComponents: [BookmarkComponent, FolderComponent, SearchResultsComponent],
  declarations: [BookmarksPage, BookmarkComponent, FolderComponent, SearchResultsComponent]
})
export class BookmarksPageModule { }
