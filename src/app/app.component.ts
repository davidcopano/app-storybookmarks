import { Component, OnInit } from '@angular/core';
import { Platform, NavController, AlertController, MenuController, IonMenu } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from './services/lang/lang.service';
import { MenuRoute, User } from './interfaces';
import { UserService } from './services/user/user.service';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookmarksService } from './services/bookmarks/bookmarks.service';
import { FoldersService } from './services/folders/folders.service';
import { SearchResultsService } from './services/search-results/search-results.service';

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
  ];
  public logoutText: string;
  public logoutConfirmationText: string;
  public cancelText: string;
  public loginSubscription: Subscription;

  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public translateService: TranslateService,
    public langService: LangService,
    public userService: UserService,
    public bookmarksService: BookmarksService,
    public foldersService: FoldersService,
    public searchResultsService: SearchResultsService
  ) {
    this.initializeApp();
  }

  ngOnInit() {
  }

  initializeApp() {
    this.initTranslations();
    this.platform.ready().then(async () => {
      await this.checkForLoggedUser();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 225);
    });
    this.loginSubscription = this.userService.onLoginSuccessful().subscribe(user => {
      this.loadItemsFromServices(this.userService.loggedUser);
      this.menuCtrl.swipeGesture(true);
    });
  }

  async initTranslations() {
    await this.langService.loadSavedLang();
    this.translateService.setDefaultLang(this.langService.currentLang);
    this.translateService.use(this.langService.currentLang);
    this.getTranslationValues().subscribe(values => {
      this.logoutText = values.logoutText;
      this.logoutConfirmationText = values.logoutConfirmationText;
      this.cancelText = values.cancelText;
    })
  }

  async checkForLoggedUser() {
    let loggedUser = await this.userService.getFromLocal();
    if (loggedUser) {
      this.userService.loggedUser = loggedUser;
      this.loadItemsFromServices(loggedUser);
      this.navCtrl.navigateRoot('/bookmarks');
    }
    else {
      this.menuCtrl.swipeGesture(false);
    }
  }

  private loadItemsFromServices(loggedUser: User) {
    this.bookmarksService.setAuthToken(loggedUser.api_token);
    this.bookmarksService.get();

    this.foldersService.setAuthToken(loggedUser.api_token);
    this.foldersService.get();

    this.searchResultsService.setAuthToken(loggedUser.api_token);
  }

  toggleUserOptions() {
    this.showUserOptions = !this.showUserOptions;
  }

  hideUserOptions() {
    this.showUserOptions = false;
  }

  async logout() {
    let alert = await this.alertCtrl.create({
      header: this.logoutText,
      message: this.logoutConfirmationText,
      buttons: [
        {
          text: this.cancelText,
          role: 'cancel'
        },
        {
          text: this.logoutText,
          role: 'destructive',
          cssClass: 'text-danger',
          handler: async () => {
            this.userService.logout();
            this.bookmarksService.reset();
            this.foldersService.reset();
            this.menuCtrl.swipeGesture(false);
            await this.menuCtrl.close();
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });
    alert.present();
  }

  private getTranslationValues() {
    return forkJoin(
      this.translateService.get('LOGOUT'),
      this.translateService.get('LOGOUT_CONFIRMATION'),
      this.translateService.get('CANCEL'),
    ).pipe(
      map(([logoutText, logoutConfirmationText, cancelText]) => {
        return {
          logoutText,
          logoutConfirmationText,
          cancelText,
        };
      })
    );
  }
}
