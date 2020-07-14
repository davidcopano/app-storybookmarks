import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Folder } from 'src/app/interfaces';
import { NavParams, NavController } from '@ionic/angular';

@Component({
  selector: 'app-folder-options',
  templateUrl: './folder-options.component.html',
  styleUrls: ['./folder-options.component.scss'],
})
export class FolderOptionsComponent implements OnInit {

  item: Folder;

  private yesDeleteText: string;
  private cancelText: string;
  private editDataText: string;
  private deleteText: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private translateService: TranslateService) { }

  ngOnInit() {
    this.item = this.navParams.get('item');
    let translationTexts = this.getTranslationValues();
    translationTexts.subscribe(translations => {
      this.yesDeleteText = translations.yesDeleteText;
      this.cancelText = translations.cancelText;
      this.editDataText = translations.editDataText;
      this.deleteText = translations.deleteText;
    });
  }

  private getTranslationValues() {
    return forkJoin(
      this.translateService.get('YES_DELETE'),
      this.translateService.get('CANCEL'),
      this.translateService.get('EDIT_DATA'),
      this.translateService.get('DELETE'),
    ).pipe(
      map(([yesDeleteText, cancelText, editDataText, deleteText]) => {
        return {
          yesDeleteText,
          cancelText,
          editDataText,
          deleteText
        };
      })
    );
  }
}
