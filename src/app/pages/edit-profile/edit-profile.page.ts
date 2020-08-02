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
import { OptionsService } from 'src/app/services/options/options.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  form: FormGroup;
  private profileEditedSuccesfullyText: string;

  constructor(private navCtrl: NavController, private translateService: TranslateService, public formBuilder: FormBuilder, private utilitiesService: UtilitiesService, private usersService: UserService, private optionsService: OptionsService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: [this.usersService.loggedUser.username, Validators.required],
      email: [this.usersService.loggedUser.email, Validators.required],
      password: [''],
      password_confirmation: [''],
    });
    this.getTranslationValues().subscribe(translations => {
      this.profileEditedSuccesfullyText = translations.profileEditedSuccesfullyText;
    });
  }

  submitForm() {
    let userData: User = this.form.value;
    this.usersService.editProfile(userData).subscribe(user => {
      this.setNewLoggedUserData(user);
      this.utilitiesService.showToast(this.profileEditedSuccesfullyText);
      this.navCtrl.navigateRoot('/bookmarks');
    }, async (error: HttpErrorResponse) => {
      this.utilitiesService.handleHttpErrorResponse(error);
    })
  }

  setNewLoggedUserData(userData: User) {
    this.usersService.loggedUser.email = userData.email;
    this.usersService.loggedUser.email_canonical = userData.email_canonical;

    this.usersService.loggedUser.username = userData.username;
    this.usersService.loggedUser.username_canonical = userData.username_canonical;

    this.usersService.saveInLocal(this.usersService.loggedUser);
  }

  private getTranslationValues() {
    return forkJoin(
      this.translateService.get('PROFILE_EDITED_SUCCESFULLY'),
    ).pipe(
      map(([profileEditedSuccesfullyText]) => {
        return {
          profileEditedSuccesfullyText
        };
      })
    );
  }
}
