import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FoldersPageRoutingModule } from './folders-routing.module';
import { FoldersPage } from './folders.page';
import { FolderComponent } from 'src/app/components/folder/folder.component';
import { SearchResultsComponent } from 'src/app/components/search-results/search-results.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FoldersPageRoutingModule,
    TranslateModule
  ],
  entryComponents: [FolderComponent, SearchResultsComponent],
  declarations: [FoldersPage, FolderComponent, SearchResultsComponent]
})
export class FoldersPageModule {}
