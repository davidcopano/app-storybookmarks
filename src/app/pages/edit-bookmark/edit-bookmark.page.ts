import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.page.html',
  styleUrls: ['./edit-bookmark.page.scss'],
})
export class EditBookmarkPage implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      url: ['', Validators.required],
      color: ['#000000', Validators.required],
      note: [''],
      folder_id: [''],
      public: [''],
      expiration_date: [new Date().toISOString()]
    })
  }

  submitForm() {
    console.log('submitForm()');
    console.log(this.form.value);
  }

}
