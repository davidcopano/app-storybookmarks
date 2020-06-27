import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  public currentLang: string;

  constructor(private storage: Storage) { }

  async loadSavedLang() {
    this.currentLang = await this.storage.get('lang');
    if(!this.currentLang) {
      this.currentLang = navigator.language;
      await this.storage.set('lang', this.currentLang);
    }
  }

  async saveLang(lang: string) {
    return this.storage.set('lang', lang);
  }
}
