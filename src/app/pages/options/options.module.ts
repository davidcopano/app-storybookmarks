import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { OptionsPageRoutingModule } from './options-routing.module';
import { OptionsPage } from './options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OptionsPageRoutingModule,
    TranslateModule
  ],
  declarations: [OptionsPage]
})
export class OptionsPageModule {}
