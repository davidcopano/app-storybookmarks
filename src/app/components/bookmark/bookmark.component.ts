import { Component, OnInit, Input } from '@angular/core';
import { Bookmark } from '../../interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
})
export class BookmarkComponent implements OnInit {

  @Input() item: Bookmark;

  constructor(private inAppBrowser: InAppBrowser) { }

  ngOnInit() {}

  openLink(url: string) {
    this.inAppBrowser.create(url, '_system');
  }

  showPopover(item: Bookmark) {
    console.log('showPopover');
    console.log(item);
  }
}
