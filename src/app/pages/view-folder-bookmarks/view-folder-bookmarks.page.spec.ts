import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewFolderBookmarksPage } from './view-folder-bookmarks.page';

describe('ViewFolderBookmarksPage', () => {
  let component: ViewFolderBookmarksPage;
  let fixture: ComponentFixture<ViewFolderBookmarksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFolderBookmarksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewFolderBookmarksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
