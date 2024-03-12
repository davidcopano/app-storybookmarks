import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Bookmark } from '../../interfaces';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { TranslateService } from '@ngx-translate/core';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { FoldersService } from 'src/app/services/folders/folders.service';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { OptionsService } from 'src/app/services/options/options.service';
import { LangService } from 'src/app/services/lang/lang.service';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.page.html',
  styleUrls: ['./edit-bookmark.page.scss'],
})
export class EditBookmarkPage implements OnInit {

  bookmark: Bookmark;
  public form: UntypedFormGroup;
  public minYear = new Date().getFullYear();
  public maxYear = new Date().getFullYear() + 5;
  private elementEditedSuccesfullyText: string;
  private unknownErrorText: string;
  private currentDatetime = moment().format('YYYY-MM-DD HH:mm:ss');

  constructor(
    public formBuilder: UntypedFormBuilder,
    private navCtrl: NavController,
    private bookmarksService: BookmarksService,
    private translateService: TranslateService,
    private utilitiesService: UtilitiesService,
    public foldersService: FoldersService,
    public optionsService: OptionsService,
    public langService: LangService
  ) { }

  ngOnInit() {
    this.bookmark = history.state.bookmark;
    this.form = this.formBuilder.group({
      title: [this.bookmark.title, Validators.required],
      url: [this.bookmark.url, Validators.required],
      color: [this.bookmark.color, Validators.required],
      note: [this.bookmark.note],
      folder_id: [this.bookmark.folder_id],
      public: [this.bookmark.public],
      expiration_date: [this.bookmark.expiration_date]
    });
    this.form.get('public').valueChanges.subscribe(isPublic => {
      this.form.patchValue({
        expiration_date: isPublic ? this.currentDatetime : null
      });
    });

    this.getTranslationValues().subscribe(translations => {
      this.elementEditedSuccesfullyText = translations.elementEditedSuccesfullyText;
      this.unknownErrorText = translations.unknownErrorText;
    });
  }

  async submitForm() {
    const bookmark: Bookmark = this.form.value;
    bookmark.id = this.bookmark.id;
    if (bookmark.public) {
      // change date format from Ionic date picker
      bookmark.expiration_date = moment(this.form.get('expiration_date').value).format('YYYY-MM-DD HH:mm:ss');
    }
    const result = await this.bookmarksService.edit(bookmark);
    if (result.success) {
      this.utilitiesService.showToast(this.elementEditedSuccesfullyText);
      this.navCtrl.navigateRoot('/bookmarks');
    }
    else {
      this.utilitiesService.showAlert('Error', this.unknownErrorText);
    }
  }

  private getTranslationValues() {
    return forkJoin(
      [
        this.translateService.get('ELEMENT_EDITED_SUCCESFULLY'),
        this.translateService.get('UNKNOWN_PETITION_ERROR')
      ]
    ).pipe(
      map((
        [
          elementEditedSuccesfullyText,
          unknownErrorText
        ]
      ) => {
        return {
          elementEditedSuccesfullyText,
          unknownErrorText,
        };
      })
    );
  }
}
