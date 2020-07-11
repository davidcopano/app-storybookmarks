import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookmarkComponent } from './bookmark.component';

describe('BookmarkComponent', () => {
  let component: BookmarkComponent;
  let fixture: ComponentFixture<BookmarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
