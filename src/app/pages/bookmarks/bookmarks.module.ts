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
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BookmarksPageRoutingModule,
    TranslateModule,
    ComponentsModule
  ],
  declarations: [BookmarksPage]
})
export class BookmarksPageModule { }
