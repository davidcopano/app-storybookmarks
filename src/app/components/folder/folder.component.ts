import { Component, OnInit, Input } from '@angular/core';
import { Folder } from '../../interfaces';
import { PopoverController } from '@ionic/angular';
import { FolderOptionsComponent } from '../folder-options/folder-options.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {

  @Input() item: Folder;

  private itemDefaultBorderColor: string = 'black';

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {}

  async showPopover($event: any, item: Folder) {
    const popover = await this.popoverCtrl.create({
      component: FolderOptionsComponent,
      event: $event,
      translucent: true,
      componentProps: {
        item: item
      }
    });
    await popover.present();
  }
}
