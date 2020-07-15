import { Component, OnInit, Input } from '@angular/core';
import { Bookmark } from '../../interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PopoverController } from '@ionic/angular';
import { BookmarkOptionsComponent } from '../bookmark-options/bookmark-options.component';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
})
export class BookmarkComponent implements OnInit {

  @Input() item: Bookmark;

  public itemDefaultBorderColor: string = 'black';

  constructor(public inAppBrowser: InAppBrowser, public popoverCtrl: PopoverController) { }

  ngOnInit() { }

  openLink(url: string) {
    this.inAppBrowser.create(url, '_system');
  }

  async showPopover($event: any, item: Bookmark) {
    const popover = await this.popoverCtrl.create({
      component: BookmarkOptionsComponent,
      event: $event,
      translucent: true,
      componentProps: {
        item: item
      }
    });
    await popover.present();
  }
}
