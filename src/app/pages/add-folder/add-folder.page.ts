import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.page.html',
  styleUrls: ['./add-folder.page.scss'],
})
export class AddFolderPage implements OnInit {

  form: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      color: ['#000000', Validators.required]
    });
  }

  submitForm() {
    console.log('submitForm()');
    console.log(this.form.value);
  }

}
