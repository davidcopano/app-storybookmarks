import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../../interfaces';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-bookmark-options',
  templateUrl: './bookmark-options.component.html',
  styleUrls: ['./bookmark-options.component.scss'],
})
export class BookmarkOptionsComponent implements OnInit {

  item: Bookmark;

  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.item = this.navParams.get('item');
  }

}
