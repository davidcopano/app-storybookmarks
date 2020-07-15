import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AddFolderPageRoutingModule } from './add-folder-routing.module';
import { AddFolderPage } from './add-folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddFolderPageRoutingModule,
    TranslateModule
  ],
  declarations: [AddFolderPage]
})
export class AddFolderPageModule {}
