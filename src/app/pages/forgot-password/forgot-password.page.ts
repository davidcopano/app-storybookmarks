import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { UserService } from 'src/app/services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form: FormGroup;
  private loadingText: string;
  private recoverPasswordText: string;
  private recoverPasswordSuccessText: string;

  constructor(private formBuilder: FormBuilder, private translateService: TranslateService, private navCtrl: NavController, private utilitiesService: UtilitiesService, private usersService: UserService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.getTranslationValues().subscribe(translations => {
      this.loadingText = translations.loadingText + '...';
      this.recoverPasswordText = translations.recoverPasswordText;
      this.recoverPasswordSuccessText = translations.recoverPasswordSuccessText;
    })
  }

  async submitForm() {
    let { email } = this.form.value;
    this.utilitiesService.showLoading(this.loadingText);
    this.usersService.recoverPassword(email).subscribe(async (response) => {
      await this.utilitiesService.dismissLoading();
      this.utilitiesService.showAlert(this.recoverPasswordText, this.recoverPasswordSuccessText);
      this.navCtrl.navigateRoot('/login');
    }, async (error: HttpErrorResponse) => {
      console.log('error = ');
      console.log(error);

      await this.utilitiesService.dismissLoading();
      this.utilitiesService.handleHttpErrorResponse(error);
    })
  }

  private getTranslationValues() {
    return forkJoin(
      this.translateService.get('LOADING'),
      this.translateService.get('RECOVER_PASSWORD'),
      this.translateService.get('RECOVER_PASSWORD_SUCCESS'),
    ).pipe(
      map(([loadingText, recoverPasswordText, recoverPasswordSuccessText]) => {
        return {
          loadingText,
          recoverPasswordText,
          recoverPasswordSuccessText
        };
      })
    );
  }

  get email() { return this.form.get('email'); }
}
