import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  form: FormGroup;
  private profileEditarSuccesfullyText: string;

  constructor(private navCtrl: NavController, private translateService: TranslateService, public formBuilder: FormBuilder, private utilitiesService: UtilitiesService, private usersService: UserService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [this.usersService.loggedUser.username, Validators.required],
      email: [this.usersService.loggedUser.email, Validators.required],
      password: [''],
      password_confirmation: [''],
    });
    this.getTranslationValues().subscribe(translations => {
      this.profileEditarSuccesfullyText = translations.profileEditarSuccesfullyText;
    });
  }

  submitForm() {
    let userData: User = this.form.value;
    this.usersService.editProfile(userData).subscribe(user => {
      this.setNewLoggedUserData(user);
      this.utilitiesService.showToast(this.profileEditarSuccesfullyText);
      this.navCtrl.navigateRoot('/bookmarks');
    }, async (error: HttpErrorResponse) => {
      await this.utilitiesService.dismissLoading();
      this.utilitiesService.handleHttpErrorResponse(error);
    })
  }

  setNewLoggedUserData(userData: User) {
    this.usersService.loggedUser.email = userData.email;
    this.usersService.loggedUser.email_canonical = userData.email_canonical;

    this.usersService.loggedUser.username = userData.username;
    this.usersService.loggedUser.username_canonical = userData.username_canonical;
  }

  private getTranslationValues() {
    return forkJoin(
      this.translateService.get('OPTIONS_SAVED_SUCCESFULLY'),
    ).pipe(
      map(([profileEditarSuccesfullyText]) => {
        return {
          profileEditarSuccesfullyText
        };
      })
    );
  }
}
