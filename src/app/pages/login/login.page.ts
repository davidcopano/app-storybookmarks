import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, FacebookProfile, GoogleLoginResponse } from "../../interfaces";
import { HttpErrorResponse } from '@angular/common/http';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('passwordInput', { read: ElementRef }) passwordEye: ElementRef;

  public passwordTypeInput = 'password';
  public form: FormGroup;
  private logginInText: string;
  private unknownPetitionErrorText: string;

  constructor(public formBuilder: FormBuilder, private translateService: TranslateService, public navCtrl: NavController, public userService: UserService, public utilitiesService: UtilitiesService, public facebook: Facebook, public google: GooglePlus, public bookmarksService: BookmarksService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['davidcopano96@outlook.com', [Validators.required, Validators.email]],
      password: ['Copano1996', Validators.required]
    });
    this.getTranslationValues().subscribe(values => {
      this.logginInText = values.logginInText;
      this.unknownPetitionErrorText = values.unknownPetitionErrorText;
    })
  }

  async submitForm() {
    await this.utilitiesService.showLoading(this.logginInText + '...');
    const values = this.form.value;
    this.userService.login(values.email, values.password).subscribe(async (user) => {
      this.processSuccessfulLogin(user);
    }, async (error: HttpErrorResponse) => {
      await this.utilitiesService.dismissLoading();
      this.utilitiesService.handleHttpErrorResponse(error);
    });
  }

  togglePasswordMode() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    const inputSelection = nativeEl.selectionStart;
    nativeEl.focus();
    setTimeout(() => {
      nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);
  }

  async loginWithFacebook() {
    try {
      await this.facebook.login(['public_profile', 'user_friends', 'email']);
      let facebookProfile: FacebookProfile = await this.facebook.api('me?fields=id,email,name', []);
      await this.utilitiesService.showLoading(this.logginInText + '...');
      this.userService.socialLogin(facebookProfile.email, facebookProfile.name).subscribe(async (user) => {
        await this.utilitiesService.dismissLoading();
        this.processSuccessfulLogin(user);
      }, async (error: HttpErrorResponse) => {
        await this.utilitiesService.dismissLoading();
        this.utilitiesService.handleHttpErrorResponse(error);
      });
    }
    catch (err) {
      console.log('err');
      console.log(err);

      this.utilitiesService.showAlert('Error Facebook', this.unknownPetitionErrorText);
    }
  }

  async loginWithGoogle() {
    try {
      let googleLoginResponse: GoogleLoginResponse = await this.google.login({});
      await this.utilitiesService.showLoading(this.logginInText + '...');
      this.userService.socialLogin(googleLoginResponse.email, googleLoginResponse.displayName).subscribe(async (user) => {
        await this.utilitiesService.dismissLoading();
        this.processSuccessfulLogin(user);
      }, async (error: HttpErrorResponse) => {
        await this.utilitiesService.dismissLoading();
        this.utilitiesService.handleHttpErrorResponse(error);
      });
    }
    catch (err) {
      console.log('err');
      console.log(err);

      this.utilitiesService.showAlert('Error Google', this.unknownPetitionErrorText);
    }
  }

  async processSuccessfulLogin(user: User) {
    await this.utilitiesService.dismissLoading();

    // save current user across the app and in local storage
    this.userService.loggedUser = user;
    this.userService.saveInLocal(user);
    this.userService.loginSuccessful(user);

    this.bookmarksService.setAuthToken(user.api_token);

    this.navCtrl.navigateRoot('/bookmarks');
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  private getTranslationValues() {
    return forkJoin(
      this.translateService.get('LOGGING_IN'),
      this.translateService.get('UNKNOWN_PETITION_ERROR'),
    ).pipe(
      map(([logginInText, unknownPetitionErrorText]) => {
        return {
          logginInText,
          unknownPetitionErrorText
        };
      })
    );
  }
}
