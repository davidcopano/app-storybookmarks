import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AddBookmarkPageRoutingModule } from './add-bookmark-routing.module';
import { AddBookmarkPage } from './add-bookmark.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddBookmarkPageRoutingModule,
    TranslateModule
  ],
  declarations: [AddBookmarkPage]
})
export class AddBookmarkPageModule {}
