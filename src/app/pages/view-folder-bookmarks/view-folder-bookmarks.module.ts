import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewFolderBookmarksPageRoutingModule } from './view-folder-bookmarks-routing.module';

import { ViewFolderBookmarksPage } from './view-folder-bookmarks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewFolderBookmarksPageRoutingModule
  ],
  declarations: [ViewFolderBookmarksPage]
})
export class ViewFolderBookmarksPageModule {}
