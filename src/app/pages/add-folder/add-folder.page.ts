import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Folder } from 'src/app/interfaces';
import * as moment from 'moment';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { FoldersService } from 'src/app/services/folders/folders.service';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.page.html',
  styleUrls: ['./add-folder.page.scss'],
})
export class AddFolderPage implements OnInit {

  public form: FormGroup;
  private elementCreatedSuccesfullyText: string;
  private unknownErrorText: string;
  private currentDatetime = moment().format('YYYY-MM-DD HH:mm:ss');

  constructor(public formBuilder: FormBuilder, private navCtrl: NavController, private translateService: TranslateService, private utilitiesService: UtilitiesService, public foldersService: FoldersService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      color: ['#000000', Validators.required]
    });

    let translationTexts = this.getTranslationValues();
    translationTexts.subscribe(translations => {
      this.elementCreatedSuccesfullyText = translations.elementCreatedSuccesfullyText;
      this.unknownErrorText = translations.unknownErrorText;
    });
  }

  async submitForm() {
    let folder: Folder = this.form.value;
    let result = await this.foldersService.add(folder);
    if (result.success) {
      this.utilitiesService.showToast(this.elementCreatedSuccesfullyText);
      this.navCtrl.navigateRoot('/folders');
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
}
