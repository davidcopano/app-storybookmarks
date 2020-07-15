import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from './services/lang/lang.service';
import { MenuRoute } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public showUserOptions: boolean = false;
  public menuRoutes: MenuRoute[] = [
    {
      translationKey: 'BOOKMARKS',
      link: '/bookmarks',
      icon: 'bookmarks'
    },
    {
      translationKey: 'FOLDERS',
      link: '/folders',
      icon: 'folder'
    },
    {
      translationKey: 'OPTIONS',
      link: '/options',
      icon: 'settings'
    },
  ]

  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public translateService: TranslateService,
    public langService: LangService
  ) {
    this.initializeApp();
  }

  ngOnInit() { 
  }

  initializeApp() {
    this.initTranslations();
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  async initTranslations() {
    await this.langService.loadSavedLang();
    this.translateService.setDefaultLang(this.langService.currentLang);
    this.translateService.use(this.langService.currentLang);
  }

  toggleUserOptions() {
    this.showUserOptions = !this.showUserOptions;
  }
}
