import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FoldersPageRoutingModule } from './folders-routing.module';
import { FoldersPage } from './folders.page';
import { FolderComponent } from 'src/app/components/folder/folder.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoldersPageRoutingModule,
    TranslateModule
  ],
  entryComponents: [FolderComponent],
  declarations: [FoldersPage, FolderComponent]
})
export class FoldersPageModule {}
