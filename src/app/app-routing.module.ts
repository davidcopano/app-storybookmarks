import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tutorial',
    pathMatch: 'full'
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then( m => m.TutorialPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'bookmarks',
    loadChildren: () => import('./pages/bookmarks/bookmarks.module').then( m => m.BookmarksPageModule)
  },
  {
    path: 'add-bookmark',
    loadChildren: () => import('./pages/add-bookmark/add-bookmark.module').then( m => m.AddBookmarkPageModule)
  },
  {
    path: 'edit-bookmark',
    loadChildren: () => import('./pages/edit-bookmark/edit-bookmark.module').then( m => m.EditBookmarkPageModule)
  },
  {
    path: 'folders',
    loadChildren: () => import('./pages/folders/folders.module').then( m => m.FoldersPageModule)
  },
  {
    path: 'add-folder',
    loadChildren: () => import('./pages/add-folder/add-folder.module').then( m => m.AddFolderPageModule)
  },
  {
    path: 'edit-folder',
    loadChildren: () => import('./pages/edit-folder/edit-folder.module').then( m => m.EditFolderPageModule)
  },
  {
    path: 'view-folder-bookmarks',
    loadChildren: () => import('./pages/view-folder-bookmarks/view-folder-bookmarks.module').then( m => m.ViewFolderBookmarksPageModule)
  },  {
    path: 'options',
    loadChildren: () => import('./pages/options/options.module').then( m => m.OptionsPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
