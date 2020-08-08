import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../interfaces';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { checkPasswords } from 'src/app/validators';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from 'src/environments/environment';
import { LangService } from 'src/app/services/lang/lang.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild('passwordInput', { read: ElementRef }) passwordEye: ElementRef;

  public form: FormGroup;
  public passwordTypeInput = 'password';
  private loadingText: string;

  constructor(private formBuilder: FormBuilder, private translateService: TranslateService,private navCtrl: NavController, public userService: UserService, private utilitiesService: UtilitiesService, private bookmarksService: BookmarksService, private langService: LangService, private inAppBrowser: InAppBrowser) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      acceptsPrivacyPolicy: [false, Validators.requiredTrue]
    }, {
      validator: checkPasswords
    });
    this.getTranslationValues().subscribe(values => {
      this.loadingText = values.loadingText;
    })
  }

  async submitForm() {
    await this.utilitiesService.showLoading(this.loadingText + '...');
    const user: User = this.form.value;
    this.userService.register(user).subscribe(async (user) => {
      this.processSuccessfulLogin(user);
    }, async (error: HttpErrorResponse) => {
      await this.utilitiesService.dismissLoading();
      this.utilitiesService.handleHttpErrorResponse(error);
    })
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

  togglePasswordMode() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    const inputSelection = nativeEl.selectionStart;
    nativeEl.focus();
    setTimeout(() => {
      nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);
  }

  togglePrivacyPolicyCheck($event: MouseEvent) {
    let target = $event.target as HTMLElement;
    let tagName = target.tagName.toLowerCase();
    if(tagName !== 'a') {
      let currentValue = this.form.get('acceptsPrivacyPolicy').value;
      this.form.patchValue({
        acceptsPrivacyPolicy: !currentValue
      });
    }
  }

  showPrivacyPolicy() {
    this.inAppBrowser.create(`${environment.webUrl}${this.langService.currentLang}/privacy-policy`, '_system');
  }

  private getTranslationValues() {
    return forkJoin(
      this.translateService.get('LOADING'),
    ).pipe(
      map(([loadingText]) => {
        return {
          loadingText
        };
      })
    );
  }

  get email() { return this.form.get('email'); }
  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }
  get password_confirmation() { return this.form.get('password_confirmation'); }
}
