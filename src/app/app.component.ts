import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from './services/lang/lang.service';
import { MenuRoute } from './interfaces';
import { UserService } from './services/user/user.service';

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
    public navCtrl: NavController,
    public translateService: TranslateService,
    public langService: LangService,
    public userService: UserService
  ) {
    this.initializeApp();
  }

  ngOnInit() { 
  }

  initializeApp() {
    this.initTranslations();
    this.platform.ready().then(async () => {
      await this.checkForLoggedUser();
      this.splashScreen.hide();
    });
  }

  async initTranslations() {
    await this.langService.loadSavedLang();
    this.translateService.setDefaultLang(this.langService.currentLang);
    this.translateService.use(this.langService.currentLang);
  }

  async checkForLoggedUser() {
    let loggedUser = await this.userService.getFromLocal();
    if(loggedUser) {
      this.userService.loggedUser = loggedUser;
      this.navCtrl.navigateRoot('/bookmarks');
    }
  }

  toggleUserOptions() {
    this.showUserOptions = !this.showUserOptions;
  }
}
