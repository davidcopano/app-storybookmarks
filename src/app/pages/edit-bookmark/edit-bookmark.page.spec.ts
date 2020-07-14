import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditBookmarkPage } from './edit-bookmark.page';

describe('EditBookmarkPage', () => {
  let component: EditBookmarkPage;
  let fixture: ComponentFixture<EditBookmarkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBookmarkPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditBookmarkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
