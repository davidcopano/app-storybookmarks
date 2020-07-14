import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBookmarkPage } from './add-bookmark.page';

const routes: Routes = [
  {
    path: '',
    component: AddBookmarkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBookmarkPageRoutingModule {}
