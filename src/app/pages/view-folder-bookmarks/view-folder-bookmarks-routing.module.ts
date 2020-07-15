import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewFolderBookmarksPage } from './view-folder-bookmarks.page';

const routes: Routes = [
  {
    path: '',
    component: ViewFolderBookmarksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewFolderBookmarksPageRoutingModule {}
