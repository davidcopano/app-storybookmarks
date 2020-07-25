import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { Bookmark } from 'src/app/interfaces';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { NavController } from '@ionic/angular';
import { FoldersService } from 'src/app/services/folders/folders.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.page.html',
  styleUrls: ['./add-bookmark.page.scss'],
})
export class AddBookmarkPage implements OnInit {

  public form: FormGroup;
  private elementCreatedSuccesfullyText: string;
  private unknownErrorText: string;

  constructor(public formBuilder: FormBuilder, private navCtrl: NavController, private bookmarksService: BookmarksService, private translateService: TranslateService, private utilitiesService: UtilitiesService, public foldersService: FoldersService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['Prueba desde aplicación', Validators.required],
      url: ['http://www.google.es', Validators.required],
      color: ['#000000', Validators.required],
      note: [''],
      folder_id: [''],
      public: [false],
      expiration_date: [moment().format('YYYY-MM-DD HH:mm:ss')]
    });
    let translationTexts = this.getTranslationValues();
    translationTexts.subscribe(translations => {
      this.elementCreatedSuccesfullyText = translations.elementCreatedSuccesfullyText;
      this.unknownErrorText = translations.unknownErrorText;
    });
  }

  async submitForm() {
    let bookmark: Bookmark = this.form.value;
    let result = await this.bookmarksService.add(bookmark);
    if (result.success) {
      this.utilitiesService.showToast(this.elementCreatedSuccesfullyText);
      this.navCtrl.navigateRoot('/bookmarks');
    }
    else {
      this.utilitiesService.showAlert('Error', this.unknownErrorText);
    }
  }

  public getTranslationValues() {
    return forkJoin(
      this.translateService.get('ELEMENT_CREATED_SUCCESFULLY'),
      this.translateService.get('UNKNOWN_PETITION_ERROR'),
    ).pipe(
      map(([elementCreatedSuccesfullyText, unknownErrorText]) => {
        return {
          elementCreatedSuccesfullyText,
          unknownErrorText,
        };
      })
    );
  }
}
