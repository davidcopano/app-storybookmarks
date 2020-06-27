import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  public currentLang: string;
  private supportedLangs = ['es', 'en'];

  constructor(private storage: Storage) { }

  async loadSavedLang() {
    this.currentLang = await this.storage.get('lang');
    if (!this.currentLang) {
      let matchingLangs = navigator.languages.filter(lang => this.supportedLangs.includes(lang));
      this.currentLang = matchingLangs.length > 0 ? matchingLangs[0] : 'es';
      await this.storage.set('lang', this.currentLang);
    }
  }

  async saveLang(lang: string) {
    return this.storage.set('lang', lang);
  }
}
