import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../models';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild('passwordInput', { read: ElementRef }) passwordEye: ElementRef;

  public form: FormGroup;

  passwordTypeInput = 'password';

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController, public userService: UserService, private utilitiesService: UtilitiesService, private bookmarksService: BookmarksService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    }, {
      validator: this.checkPasswords
    })
  }

  async submitForm() {
    await this.utilitiesService.showLoading('Cargando...');
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

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('password_confirmation').value;
    return pass === confirmPass ? null : { notSame: true }
  }

  get email() { return this.form.get('email'); }
  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }
  get password_confirmation() { return this.form.get('password_confirmation'); }
}
