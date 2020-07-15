import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoldersPage } from './folders.page';
import { AddFolderPage } from '../add-folder/add-folder.page';

const routes: Routes = [
  {
    path: '',
    component: FoldersPage
  },
  {
    path: 'add',
    component: AddFolderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoldersPageRoutingModule {}
