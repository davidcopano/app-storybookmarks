import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, AlertController, NavController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Bookmark } from '../../interfaces';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { environment } from 'src/environments/environment';

const { Browser } = Plugins;

@Component({
  selector: 'app-bookmark-options',
  templateUrl: './bookmark-options.component.html',
  styleUrls: ['./bookmark-options.component.scss'],
})
export class BookmarkOptionsComponent implements OnInit {

  item: Bookmark;

  public linkCopiedToClipboardText: string;
  public deleteBookmarkText: string;
  public deleteBookmarkConfirmationText: string;
  public yesDeleteText: string;
  public cancelText: string;

  public openLinkText: string;
  public copyLinkText: string;
  public copyPublicLinkText: string;
  public editDataText: string;
  public deleteText: string;
  public unknownErrorText: string;
  public elementDeletedSuccesfullyText: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utilitiesService: UtilitiesService,
    public popoverCtrl: PopoverController,
    public translateService: TranslateService,
    public alertCtrl: AlertController,
    private bookmarksService: BookmarksService
  ) { }

  ngOnInit() {
    this.item = this.navParams.get('item');
    this.getTranslationValues().subscribe(translations => {
      this.linkCopiedToClipboardText = translations.linkCopiedToClipboardText;
      this.deleteBookmarkText = translations.deleteBookmarkText;
      this.deleteBookmarkConfirmationText = translations.deleteBookmarkConfirmationText;
      this.yesDeleteText = translations.yesDeleteText;
      this.cancelText = translations.cancelText;

      this.openLinkText = translations.openLinkText;
      this.copyLinkText = translations.copyLinkText;
      this.editDataText = translations.editDataText;
      this.deleteText = translations.deleteText;
      this.elementDeletedSuccesfullyText = translations.elementDeletedSuccesfullyText;
      this.unknownErrorText = translations.unknownErrorText;
      this.copyPublicLinkText = translations.copyLinkText + ' ' + translations.publicText.toLowerCase();
    });
  }

  openLink() {
    const styles = getComputedStyle(document.documentElement);
    const value = String(styles.getPropertyValue('--ion-color-primary')).trim();
    Browser.open({
      url: this.item.url,
      toolbarColor: value ? value : '#247ba0'
    });
    this.closeSelf();
  }

  async copyLink() {
    this.utilitiesService.copyToClipboard(this.item.url);
    this.closeSelf();
    this.utilitiesService.showToast(this.linkCopiedToClipboardText);
  }

  async copyPublicLink() {
    this.utilitiesService.copyToClipboard(`${environment.publicBookmarksUrl}${this.item.id}`);
    this.closeSelf();
    this.utilitiesService.showToast(this.linkCopiedToClipboardText);
  }

  async editData() {
    this.closeSelf();
    this.navCtrl.navigateForward('/bookmarks/edit', {
      state: {
        bookmark: this.item
      }
    });
  }

  async delete() {
    const alert = await this.alertCtrl.create({
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
          handler: async () => {
            const result = await this.bookmarksService.delete(this.item);
            if (result.success) {
              this.utilitiesService.showToast(this.elementDeletedSuccesfullyText);
              this.closeSelf();
            }
            else {
              this.utilitiesService.showAlert('Error', this.unknownErrorText);
            }
          }
        }
      ]
    });
    await alert.present();
  }

  public closeSelf() {
    return this.popoverCtrl.dismiss();
  }

  private getTranslationValues() {
    return forkJoin(
      [
        this.translateService.get('LINK_COPIED_TO_CLIPBOARD'),
        this.translateService.get('DELETE_BOOKMARK'),
        this.translateService.get('DELETE_BOOKMARK_CONFIRMATION'),
        this.translateService.get('YES_DELETE'),
        this.translateService.get('CANCEL'),
        this.translateService.get('OPEN_LINK'),
        this.translateService.get('COPY_LINK'),
        this.translateService.get('EDIT_DATA'),
        this.translateService.get('DELETE'),
        this.translateService.get('ELEMENT_DELETED_SUCCESFULLY'),
        this.translateService.get('UNKNOWN_PETITION_ERROR'),
        this.translateService.get('PUBLIC')
      ]
    ).pipe(
      map((
        [
          linkCopiedToClipboardText,
          deleteBookmarkText,
          deleteBookmarkConfirmationText,
          yesDeleteText,
          cancelText,
          openLinkText,
          copyLinkText,
          editDataText,
          deleteText,
          elementDeletedSuccesfullyText,
          unknownErrorText,
          publicText
        ]
      ) => {
        return {
          linkCopiedToClipboardText,
          deleteBookmarkText,
          deleteBookmarkConfirmationText,
          yesDeleteText,
          cancelText,
          openLinkText,
          copyLinkText,
          editDataText,
          deleteText,
          elementDeletedSuccesfullyText,
          unknownErrorText,
          publicText
        };
      })
    );
  }
}
