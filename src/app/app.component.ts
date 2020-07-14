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

  private showUserOptions: boolean = false;
  private menuRoutes: MenuRoute[] = [
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
      link: '/bookmarks',
      icon: 'settings'
    },
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private translateService: TranslateService,
    private langService: LangService
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
