import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Folder } from 'src/app/interfaces';

@Component({
  selector: 'app-edit-folder',
  templateUrl: './edit-folder.page.html',
  styleUrls: ['./edit-folder.page.scss'],
})
export class EditFolderPage implements OnInit {

  folder: Folder;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.folder = history.state.folder;
    this.form = this.formBuilder.group({
      name: [this.folder.name, Validators.required],
      color: [this.folder.color, Validators.required]
    });
  }

  submitForm() {
    console.log('submitForm()');
    console.log(this.form.value);
  }

}
