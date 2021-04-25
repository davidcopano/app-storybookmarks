import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditBookmarkPage } from './edit-bookmark.page';

const routes: Routes = [
  {
    path: '',
    component: EditBookmarkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBookmarkPageRoutingModule {}
