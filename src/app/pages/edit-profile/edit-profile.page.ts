import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  form: FormGroup;

  constructor(public formBuilder: FormBuilder, private usersService: UserService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      user: [this.usersService.loggedUser.username, Validators.required],
      email: [this.usersService.loggedUser.email, Validators.required],
      password: [''],
      password_confirmation: [''],
    })
  }

  submitForm() {
    console.log('submitForm()');
    console.log(this.form.value);
  }
}
