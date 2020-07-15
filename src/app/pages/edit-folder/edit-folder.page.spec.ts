import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditFolderPage } from './edit-folder.page';

describe('EditFolderPage', () => {
  let component: EditFolderPage;
  let fixture: ComponentFixture<EditFolderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFolderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditFolderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
