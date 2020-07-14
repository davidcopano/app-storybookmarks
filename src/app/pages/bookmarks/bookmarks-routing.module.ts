import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookmarksPage } from './bookmarks.page';
import { AddBookmarkPage } from '../add-bookmark/add-bookmark.page';

const routes: Routes = [
  {
    path: '',
    component: BookmarksPage
  },
  {
    path: 'add',
    component: AddBookmarkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookmarksPageRoutingModule {}
