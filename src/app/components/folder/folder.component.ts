import { Component, OnInit, Input } from '@angular/core';
import { Folder } from '../../interfaces';
import { PopoverController } from '@ionic/angular';
import { FolderOptionsComponent } from '../folder-options/folder-options.component';
import { LangService } from 'src/app/services/lang/lang.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {

  @Input() item: Folder;

  public itemDefaultBorderColor = 'black';

  constructor(public popoverCtrl: PopoverController, public langService: LangService) { }

  ngOnInit() { }

  async showPopover($event: any, item: Folder) {
    const popover = await this.popoverCtrl.create({
      component: FolderOptionsComponent,
      event: $event,
      translucent: true,
      componentProps: {
        item
      }
    });
    await popover.present();
  }
}
