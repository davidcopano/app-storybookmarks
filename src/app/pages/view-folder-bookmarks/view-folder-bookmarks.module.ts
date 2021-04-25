import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ViewFolderBookmarksPageRoutingModule } from './view-folder-bookmarks-routing.module';
import { ViewFolderBookmarksPage } from './view-folder-bookmarks.page';
import { BookmarkComponent } from 'src/app/components/bookmark/bookmark.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFolderBookmarksPageRoutingModule,
    TranslateModule,
    ComponentsModule
  ],
  declarations: [ViewFolderBookmarksPage]
})
export class ViewFolderBookmarksPageModule {}
