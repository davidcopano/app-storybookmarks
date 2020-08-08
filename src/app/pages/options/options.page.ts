import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { OptionsService } from 'src/app/services/options/options.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { LangService } from 'src/app/services/lang/lang.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {

  public form: FormGroup;
  private optionsSavedSuccesfullyText: string;

  constructor(private navCtrl: NavController, public translateService: TranslateService, public formBuilder: FormBuilder, public optionsService: OptionsService, private utilitiesService: UtilitiesService, private langService: LangService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      enable_multimedia: [this.optionsService.enable_multimedia],
      enable_dark_mode: [this.optionsService.enable_dark_mode]
    });
    this.form.get('enable_dark_mode').valueChanges.subscribe(value => {
      this.utilitiesService.toggleDarkTheme(value);
    });
    this.getTranslationValues().subscribe(translations => {
      this.optionsSavedSuccesfullyText = translations.optionsSavedSuccesfullyText;
    });
  }

  submitForm() {
    let { enable_multimedia, enable_dark_mode } = this.form.value;
    this.optionsService.enable_multimedia = enable_multimedia;
    this.optionsService.enable_dark_mode = enable_dark_mode;
    this.optionsService.save();
    this.utilitiesService.showToast(this.optionsSavedSuccesfullyText);
    this.navCtrl.navigateRoot('/bookmarks');
  }

  async changeLang(lang: string) {
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    this.langService.saveLang(lang);
  }

  private getTranslationValues() {
    return forkJoin(
      this.translateService.get('OPTIONS_SAVED_SUCCESFULLY'),
    ).pipe(
      map(([optionsSavedSuccesfullyText]) => {
        return {
          optionsSavedSuccesfullyText
        };
      })
    );
  }
}
