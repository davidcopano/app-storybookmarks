import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, FacebookProfile, GoogleLoginResponse } from "../../models";
import { HttpErrorResponse } from '@angular/common/http';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('passwordInput', { read: ElementRef }) passwordEye: ElementRef;

  public passwordTypeInput = 'password';
  public form: FormGroup;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public userService: UserService, public utilitiesService: UtilitiesService, public facebook: Facebook, public google: GooglePlus) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['davidcopano96@outlook.com', [Validators.required, Validators.email]],
      password: ['Copano1996', Validators.required]
    });
  }

  async submitForm() {
    await this.utilitiesService.showLoading('Iniciando sesión...');
    const values = this.form.value;
    this.userService.login(values.email, values.password).subscribe(async (user) => {

      await this.utilitiesService.dismissLoading();

      // save current user across the app and in local storage
      this.userService.loggedUser = user;
      this.userService.saveInLocal(user);

      this.navCtrl.navigateRoot('/bookmarks');

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
      let facebookLoginResponse = await this.facebook.login(['public_profile', 'user_friends', 'email']);
      let facebookProfile: FacebookProfile = await this.facebook.api('me?fields=id,email,name', []);

      console.log('facebookProfile = ');
      console.log(facebookProfile);
    }
    catch (err) {
      console.log('err');
      console.log(err);
    }
  }

  async loginWithGoogle() {
    try {
      let googleLoginResponse: GoogleLoginResponse = await this.google.login({});

      console.log('googleLoginResponse =');
      console.log(googleLoginResponse);
    }
    catch (err) {
      console.log('err');
      console.log(err);
    }
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
}
