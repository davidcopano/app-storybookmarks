import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.page.html',
  styleUrls: ['./add-bookmark.page.scss'],
})
export class AddBookmarkPage implements OnInit {

  form: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

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
