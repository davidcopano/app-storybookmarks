import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFolderPage } from './edit-folder.page';

const routes: Routes = [
  {
    path: '',
    component: EditFolderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFolderPageRoutingModule {}
