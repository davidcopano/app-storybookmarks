import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../../interfaces';
import { NavParams } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-bookmark-options',
  templateUrl: './bookmark-options.component.html',
  styleUrls: ['./bookmark-options.component.scss'],
})
export class BookmarkOptionsComponent implements OnInit {

  item: Bookmark;

  constructor(private navParams: NavParams, private inAppBrowser: InAppBrowser) { }

  ngOnInit() {
    this.item = this.navParams.get('item');
  }

  openLink() {
    this.inAppBrowser.create(this.item.url, '_system');
  }
}
