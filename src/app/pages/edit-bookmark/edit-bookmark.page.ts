import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Bookmark } from '../../interfaces';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.page.html',
  styleUrls: ['./edit-bookmark.page.scss'],
})
export class EditBookmarkPage implements OnInit {

  bookmark: Bookmark;
  form: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bookmark = history.state.bookmark;
    this.form = this.formBuilder.group({
      title: [this.bookmark.title, Validators.required],
      url: [this.bookmark.url, Validators.required],
      color: [this.bookmark.color, Validators.required],
      note: [this.bookmark.note],
      folder_id: [this.bookmark.folder_id],
      public: [this.bookmark.public],
      expiration_date: [new Date().toISOString()]
    })
  }

  submitForm() {
    console.log('submitForm()');
    console.log(this.form.value);
  }

}
