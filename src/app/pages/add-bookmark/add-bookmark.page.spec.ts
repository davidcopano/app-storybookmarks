import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBookmarkPage } from './add-bookmark.page';

describe('AddBookmarkPage', () => {
  let component: AddBookmarkPage;
  let fixture: ComponentFixture<AddBookmarkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBookmarkPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBookmarkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
