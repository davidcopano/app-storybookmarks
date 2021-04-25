import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EditFolderPageRoutingModule } from './edit-folder-routing.module';
import { EditFolderPage } from './edit-folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditFolderPageRoutingModule,
    TranslateModule
  ],
  declarations: [EditFolderPage]
})
export class EditFolderPageModule {}
