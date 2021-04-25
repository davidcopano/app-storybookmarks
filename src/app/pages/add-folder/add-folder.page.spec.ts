import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddFolderPage } from './add-folder.page';

describe('AddFolderPage', () => {
  let component: AddFolderPage;
  let fixture: ComponentFixture<AddFolderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFolderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddFolderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
