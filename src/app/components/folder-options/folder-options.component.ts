import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Folder } from 'src/app/interfaces';
import { NavParams, NavController, PopoverController, AlertController } from '@ionic/angular';
import { FoldersService } from 'src/app/services/folders/folders.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-folder-options',
  templateUrl: './folder-options.component.html',
  styleUrls: ['./folder-options.component.scss'],
})
export class FolderOptionsComponent implements OnInit {

  item: Folder;

  public viewText: string;
  public bookmarksText: string;
  public yesDeleteText: string;
  public cancelText: string;
  public editDataText: string;
  public deleteText: string;
  public deleteFolderText: string;
  public deleteFolderConfirmationText: string;
  public unknownErrorText: string;
  public elementDeletedSuccesfullyText: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translateService: TranslateService,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    private foldersService: FoldersService,
    private utilitiesService: UtilitiesService
  ) { }

  ngOnInit() {
    this.item = this.navParams.get('item');
    this.getTranslationValues().subscribe(translations => {
      this.viewText = translations.viewText;
      this.bookmarksText = translations.bookmarksText;
      this.yesDeleteText = translations.yesDeleteText;
      this.cancelText = translations.cancelText;
      this.editDataText = translations.editDataText;
      this.deleteText = translations.deleteText;
      this.deleteFolderText = translations.deleteFolderText;
      this.deleteFolderConfirmationText = translations.deleteFolderConfirmationText;
      this.unknownErrorText = translations.unknownErrorText;
      this.elementDeletedSuccesfullyText = translations.elementDeletedSuccesfullyText;
    });
  }

  async viewFolderBookmarks() {
    this.closeSelf();
    this.navCtrl.navigateForward('/folders/view-bookmarks', {
      state: {
        folder: this.item
      }
    });
  }

  async editData() {
    this.closeSelf();
    this.navCtrl.navigateForward('/folders/edit', {
      state: {
        folder: this.item
      }
    });
  }

  async delete() {
    const alert = await this.alertCtrl.create({
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
          handler: async () => {
            const result = await this.foldersService.delete(this.item);
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

  public getTranslationValues() {
    return forkJoin(
      [
        this.translateService.get('VIEW'),
        this.translateService.get('BOOKMARKS'),
        this.translateService.get('YES_DELETE'),
        this.translateService.get('CANCEL'),
        this.translateService.get('EDIT_DATA'),
        this.translateService.get('DELETE'),
        this.translateService.get('DELETE_FOLDER'),
        this.translateService.get('DELETE_FOLDER_CONFIRMATION'),
        this.translateService.get('ELEMENT_DELETED_SUCCESFULLY'),
        this.translateService.get('UNKNOWN_PETITION_ERROR')
      ]
    ).pipe(
      map((
        [
          viewText,
          bookmarksText,
          yesDeleteText,
          cancelText,
          editDataText,
          deleteText,
          deleteFolderText,
          deleteFolderConfirmationText,
          elementDeletedSuccesfullyText,
          unknownErrorText
        ]
      ) => {
        return {
          viewText,
          bookmarksText,
          yesDeleteText,
          cancelText,
          editDataText,
          deleteText,
          deleteFolderText,
          deleteFolderConfirmationText,
          elementDeletedSuccesfullyText,
          unknownErrorText
        };
      })
    );
  }
}
