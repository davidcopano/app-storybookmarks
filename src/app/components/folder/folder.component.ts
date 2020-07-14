import { Component, OnInit, Input } from '@angular/core';
import { Folder } from '../../interfaces';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
})
export class FolderComponent implements OnInit {

  @Input() item: Folder;

  private itemDefaultBorderColor: string = 'black';

  constructor() { }

  ngOnInit() {}

}
