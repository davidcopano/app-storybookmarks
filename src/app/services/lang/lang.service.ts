import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

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
  }

  constructor(public storage: Storage) { }

  async loadSavedLang() {
    this.currentLang = await this.storage.get('lang');
    if (!this.currentLang) {
      let matchingLangs = navigator.languages.filter(lang => this.supportedLangs.includes(lang));
      this.currentLang = matchingLangs.length > 0 ? matchingLangs[0] : 'es';
      await this.storage.set('lang', this.currentLang);
    }
    this.currentMonthShortNames = this.monthShortNames[this.currentLang];
    this.currentDateFormat = this.supportedDateFormats[this.currentLang];
  }

  async saveLang(lang: string) {
    this.currentLang = lang;
    this.currentMonthShortNames = this.monthShortNames[this.currentLang];
    this.currentDateFormat = this.supportedDateFormats[this.currentLang];
    return this.storage.set('lang', lang);
  }
}
