import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../../interfaces';
import { NavParams, PopoverController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bookmark-options',
  templateUrl: './bookmark-options.component.html',
  styleUrls: ['./bookmark-options.component.scss'],
})
export class BookmarkOptionsComponent implements OnInit {

  item: Bookmark;
  linkCopiedToClipboardText: string;

  constructor(private navParams: NavParams, private utilities: UtilitiesService, private inAppBrowser: InAppBrowser, private popoverCtrl: PopoverController, private translateService: TranslateService) { }

  ngOnInit() {
    this.item = this.navParams.get('item');

    this.translateService.get('LINK_COPIED_TO_CLIPBOARD').subscribe(text => {
      this.linkCopiedToClipboardText = text;
    })
  }

  openLink() {
    this.inAppBrowser.create(this.item.url, '_system');
    this.closeSelf();
  }

  async copyLink() {
    this.utilities.copyToClipboard(this.item.url);
    this.closeSelf();
    this.utilities.showToast(this.linkCopiedToClipboardText);
  }

  private closeSelf() {
    return this.popoverCtrl.dismiss();
  }
}
