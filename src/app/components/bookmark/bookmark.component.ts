import { Component, OnInit, Input } from '@angular/core';
import { Bookmark } from '../../interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PopoverController } from '@ionic/angular';
import { BookmarkOptionsComponent } from '../bookmark-options/bookmark-options.component';
import { LangService } from 'src/app/services/lang/lang.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { DomSanitizer } from '@angular/platform-browser';
import { OptionsService } from 'src/app/services/options/options.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
})
export class BookmarkComponent implements OnInit {

  @Input() item: Bookmark;

  public itemDefaultBorderColor: string = 'black';

  constructor(public sanitizer: DomSanitizer, public inAppBrowser: InAppBrowser, public popoverCtrl: PopoverController, public langService: LangService, public utilitiesService: UtilitiesService, public optionsService: OptionsService) { }

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
