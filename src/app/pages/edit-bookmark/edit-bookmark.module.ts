import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EditBookmarkPageRoutingModule } from './edit-bookmark-routing.module';
import { EditBookmarkPage } from './edit-bookmark.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditBookmarkPageRoutingModule,
    TranslateModule
  ],
  declarations: [EditBookmarkPage]
})
export class EditBookmarkPageModule {}
