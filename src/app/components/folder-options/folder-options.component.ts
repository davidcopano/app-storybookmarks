import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Folder } from 'src/app/interfaces';
import { NavParams, NavController, PopoverController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-folder-options',
  templateUrl: './folder-options.component.html',
  styleUrls: ['./folder-options.component.scss'],
})
export class FolderOptionsComponent implements OnInit {

  item: Folder;

  private viewText: string;
  private bookmarksText: string;
  private yesDeleteText: string;
  private cancelText: string;
  private editDataText: string;
  private deleteText: string;
  private deleteFolderText: string;
  private deleteFolderConfirmationText: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private translateService: TranslateService, private popoverCtrl: PopoverController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.item = this.navParams.get('item');
    let translationTexts = this.getTranslationValues();
    translationTexts.subscribe(translations => {
      this.viewText = translations.viewText;
      this.bookmarksText = translations.bookmarksText;
      this.yesDeleteText = translations.yesDeleteText;
      this.cancelText = translations.cancelText;
      this.editDataText = translations.editDataText;
      this.deleteText = translations.deleteText;
      this.deleteFolderText = translations.deleteFolderText;
      this.deleteFolderConfirmationText = translations.deleteFolderConfirmationText;
    });
  }

  async delete() {
    let alert = await this.alertCtrl.create({
      header: this.deleteFolderText,
      message: this.deleteFolderConfirmationText,
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
      this.translateService.get('VIEW'),
      this.translateService.get('BOOKMARKS'),
      this.translateService.get('YES_DELETE'),
      this.translateService.get('CANCEL'),
      this.translateService.get('EDIT_DATA'),
      this.translateService.get('DELETE'),
      this.translateService.get('DELETE_FOLDER'),
      this.translateService.get('DELETE_FOLDER_CONFIRMATION'),
    ).pipe(
      map(([viewText, bookmarksText, yesDeleteText, cancelText, editDataText, deleteText, deleteFolderText, deleteFolderConfirmationText]) => {
        return {
          viewText,
          bookmarksText,
          yesDeleteText,
          cancelText,
          editDataText,
          deleteText,
          deleteFolderText,
          deleteFolderConfirmationText
        };
      })
    );
  }
}
