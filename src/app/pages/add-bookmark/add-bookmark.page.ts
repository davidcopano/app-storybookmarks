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
import { OptionsService } from 'src/app/services/options/options.service';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.page.html',
  styleUrls: ['./add-bookmark.page.scss'],
})
export class AddBookmarkPage implements OnInit {

  public form: FormGroup;
  public minYear = new Date().getFullYear();
  public maxYear = new Date().getFullYear() + 5;
  private elementCreatedSuccesfullyText: string;
  private unknownErrorText: string;
  private currentDatetime = moment().format('YYYY-MM-DD HH:mm:ss');

  constructor(public formBuilder: FormBuilder, private navCtrl: NavController, private bookmarksService: BookmarksService, private translateService: TranslateService, private utilitiesService: UtilitiesService, public foldersService: FoldersService, public optionsService: OptionsService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      url: ['', Validators.required],
      color: ['#000000', Validators.required],
      note: [''],
      folder_id: [''],
      public: [false],
      expiration_date: [this.currentDatetime]
    });
    this.form.get('public').valueChanges.subscribe(isPublic => {
      this.form.patchValue({
        expiration_date: isPublic ? this.currentDatetime : null
      });
    });

    let translationTexts = this.getTranslationValues();
    translationTexts.subscribe(translations => {
      this.elementCreatedSuccesfullyText = translations.elementCreatedSuccesfullyText;
      this.unknownErrorText = translations.unknownErrorText;
    });
  }

  async submitForm() {
    let bookmark: Bookmark = this.form.value;
    if(bookmark.public) {
      // change date format from Ionic date picker
      bookmark.expiration_date = moment(this.form.get('expiration_date').value).format('YYYY-MM-DD HH:mm:ss');
    }
    let result = await this.bookmarksService.add(bookmark);
    if (result.success) {
      this.utilitiesService.showToast(this.elementCreatedSuccesfullyText);
      this.navCtrl.navigateRoot('/bookmarks');
    }
    else {
      this.utilitiesService.showAlert('Error', this.unknownErrorText);
    }
  }

  private getTranslationValues() {
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

  get url() { return this.form.get('url'); }
}
