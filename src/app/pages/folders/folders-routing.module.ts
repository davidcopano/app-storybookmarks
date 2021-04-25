import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoldersPage } from './folders.page';
import { AddFolderPage } from '../add-folder/add-folder.page';
import { EditFolderPage } from '../edit-folder/edit-folder.page';
import { ViewFolderBookmarksPage } from '../view-folder-bookmarks/view-folder-bookmarks.page';

const routes: Routes = [
  {
    path: '',
    component: FoldersPage
  },
  {
    path: 'add',
    component: AddFolderPage
  },
  {
    path: 'edit',
    component: EditFolderPage
  },
  {
    path: 'view-bookmarks',
    component: ViewFolderBookmarksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoldersPageRoutingModule {}
