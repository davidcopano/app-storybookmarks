import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFolderPage } from './add-folder.page';

const routes: Routes = [
  {
    path: '',
    component: AddFolderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFolderPageRoutingModule {}
