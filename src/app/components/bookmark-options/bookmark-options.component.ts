import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../../interfaces';
import { NavParams, PopoverController, AlertController, NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bookmark-options',
  templateUrl: './bookmark-options.component.html',
  styleUrls: ['./bookmark-options.component.scss'],
})
export class BookmarkOptionsComponent implements OnInit {

  item: Bookmark;

  private linkCopiedToClipboardText: string;
  private deleteBookmarkText: string;
  private deleteBookmarkConfirmationText: string;
  private yesDeleteText: string;
  private cancelText: string;

  private openLinkText: string;
  private copyLinkText: string;
  private editDataText: string;
  private deleteText: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private utilities: UtilitiesService, private inAppBrowser: InAppBrowser, private popoverCtrl: PopoverController, private translateService: TranslateService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.item = this.navParams.get('item');
    let translationTexts = this.getTranslationValues();
    translationTexts.subscribe(translations => {
      this.linkCopiedToClipboardText = translations.linkCopiedToClipboardText;
      this.deleteBookmarkText = translations.deleteBookmarkText;
      this.deleteBookmarkConfirmationText = translations.deleteBookmarkConfirmationText;
      this.yesDeleteText = translations.yesDeleteText;
      this.cancelText = translations.cancelText;

      this.openLinkText = translations.openLinkText;
      this.copyLinkText = translations.copyLinkText;
      this.editDataText = translations.editDataText;
      this.deleteText = translations.deleteText;
    });
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

  async editData() {
    this.closeSelf();
    this.navCtrl.navigateForward('/bookmarks/edit', {
      state: {
        bookmark: this.item
      }
    })
  }

  async delete() {
    let alert = await this.alertCtrl.create({
      header: this.deleteBookmarkText,
      message: this.deleteBookmarkConfirmationText,
      buttons: [
        {
          text: this.cancelText,
          role: 'cancel'
        },
        {
          text: this.yesDeleteText,
          role: 'destructive',
          cssClass: 'text-danger',
          handler: () => {
            console.log('delete clicked');
            this.closeSelf();
          }
        }
      ]
    });
    await alert.present();
  }

  private closeSelf() {
    return this.popoverCtrl.dismiss();
  }

  private getTranslationValues() {
    return forkJoin(
      this.translateService.get('LINK_COPIED_TO_CLIPBOARD'),
      this.translateService.get('DELETE_BOOKMARK'),
      this.translateService.get('DELETE_BOOKMARK_CONFIRMATION'),
      this.translateService.get('YES_DELETE'),
      this.translateService.get('CANCEL'),
      this.translateService.get('OPEN_LINK'),
      this.translateService.get('COPY_LINK'),
      this.translateService.get('EDIT_DATA'),
      this.translateService.get('DELETE'),
    ).pipe(
      map(([linkCopiedToClipboardText, deleteBookmarkText, deleteBookmarkConfirmationText, yesDeleteText, cancelText, openLinkText, copyLinkText, editDataText, deleteText]) => {
        return {
          linkCopiedToClipboardText,
          deleteBookmarkText,
          deleteBookmarkConfirmationText,
          yesDeleteText,
          cancelText,
          openLinkText,
          copyLinkText,
          editDataText,
          deleteText
        };
      })
    );
  }
}
