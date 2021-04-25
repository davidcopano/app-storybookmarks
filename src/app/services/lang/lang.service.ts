import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Subject } from 'rxjs';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class LangService {

  public currentLang: string;
  public currentMonthShortNames: string[];
  public currentDateFormat: string;
  private supportedLangs = ['es', 'en'];
  private monthShortNames = {
    es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };
  private supportedDateFormats = {
    es: 'D MMM YYYY',
    en: 'MMM DD YYYY'
  };
  private $langChanged = new Subject<string>();

  constructor() { }

  /**
   * Loads and sets current language variables.
   */
  async loadSavedLang() {
    let { value } = await Storage.get({
      key: 'lang'
    });
    this.currentLang = value;
    if (!this.currentLang) {
      const matchingLangs = navigator.languages.filter(lang => this.supportedLangs.includes(lang));
      this.currentLang = matchingLangs.length > 0 ? matchingLangs[0] : 'es';
      await Storage.set({
        key: 'lang',
        value: this.currentLang
      });
      // await this.storage.set('lang', this.currentLang);
    }
    this.currentMonthShortNames = this.monthShortNames[this.currentLang];
    this.currentDateFormat = this.supportedDateFormats[this.currentLang];
  }

  /**
   * Saves a language in local storage.
   * @param lang Language to be saved
   */
  async saveLang(lang: string) {
    this.currentLang = lang;
    this.currentMonthShortNames = this.monthShortNames[this.currentLang];
    this.currentDateFormat = this.supportedDateFormats[this.currentLang];
    this.$langChanged.next(lang);
    return Storage.set({
      key: 'lang',
      value: lang
    });
    // return this.storage.set('lang', lang);
  }

  /**
   * Listen on language change across the application.
   */
  public onLangChange() {
    return this.$langChanged.asObservable();
  }
}
