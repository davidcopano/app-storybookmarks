import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { BookmarksPageRoutingModule } from './bookmarks-routing.module';
import { BookmarksPage } from './bookmarks.page';
import { BookmarkComponent } from 'src/app/components/bookmark/bookmark.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BookmarksPageRoutingModule,
    TranslateModule
  ],
  entryComponents: [BookmarkComponent],
  declarations: [BookmarksPage, BookmarkComponent]
})
export class BookmarksPageModule {}
