import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { User, FacebookProfile, GoogleLoginResponse } from "../../models";
import { HttpErrorResponse } from '@angular/common/http';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('passwordInput', { read: ElementRef }) passwordEye: ElementRef;

  public passwordTypeInput = 'password';
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private utilitiesService: UtilitiesService, private facebook: Facebook, private google: GooglePlus) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async submitForm() {
    await this.utilitiesService.showLoading('Iniciando sesión...');
    let values = this.form.value;
    this.apiService.login(values.email, values.password).subscribe(async (response) => {
      await this.utilitiesService.dismissLoading();
      console.log('response = ');
      console.log(response);
    }, async (error: HttpErrorResponse) => {
      await this.utilitiesService.dismissLoading();
      this.utilitiesService.handleHttpErrorResponse(error);
    })
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
    catch(err) {
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
    catch(err) {
      console.log('err');
      console.log(err);
    }
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
}
