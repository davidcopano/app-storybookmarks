import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  form: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
      password_confirmation: [''],
    })
  }

  submitForm() {
    console.log('submitForm()');
    console.log(this.form.value);
  }
}
