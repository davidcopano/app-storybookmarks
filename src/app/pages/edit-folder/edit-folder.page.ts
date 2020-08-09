import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Folder } from 'src/app/interfaces';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { FoldersService } from 'src/app/services/folders/folders.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { OptionsService } from 'src/app/services/options/options.service';

@Component({
  selector: 'app-edit-folder',
  templateUrl: './edit-folder.page.html',
  styleUrls: ['./edit-folder.page.scss'],
})
export class EditFolderPage implements OnInit {

  folder: Folder;
  public form: FormGroup;
  private elementEditedSuccesfullyText: string;
  private unknownErrorText: string;

  constructor(
    public formBuilder: FormBuilder,
    private navCtrl: NavController,
    private translateService: TranslateService,
    private utilitiesService: UtilitiesService,
    public foldersService: FoldersService,
    public optionsService: OptionsService
  ) { }

  ngOnInit() {
    this.folder = history.state.folder;
    this.form = this.formBuilder.group({
      name: [this.folder.name, Validators.required],
      color: [this.folder.color, Validators.required],
      created_at: [this.folder.created_at, Validators.required]
    });

    this.getTranslationValues().subscribe(translations => {
      this.elementEditedSuccesfullyText = translations.elementEditedSuccesfullyText;
      this.unknownErrorText = translations.unknownErrorText;
    });
  }

  async submitForm() {
    const folder: Folder = this.form.value;
    folder.id = this.folder.id;
    const result = await this.foldersService.edit(folder);
    if (result.success) {
      this.utilitiesService.showToast(this.elementEditedSuccesfullyText);
      this.navCtrl.navigateRoot('/folders');
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
