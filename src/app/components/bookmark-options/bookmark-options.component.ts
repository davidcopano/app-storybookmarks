import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../../interfaces';
import { NavParams, PopoverController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-bookmark-options',
  templateUrl: './bookmark-options.component.html',
  styleUrls: ['./bookmark-options.component.scss'],
})
export class BookmarkOptionsComponent implements OnInit {

  item: Bookmark;

  constructor(private navParams: NavParams, private utilities: UtilitiesService, private inAppBrowser: InAppBrowser, private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.item = this.navParams.get('item');
  }

  openLink() {
    this.inAppBrowser.create(this.item.url, '_system');
    this.closeSelf();
  }

  copyLink() {
    this.utilities.copyToClipboard(this.item.url);
    this.closeSelf();
  }

  private closeSelf() {
    this.popoverCtrl.dismiss();
  }
}
