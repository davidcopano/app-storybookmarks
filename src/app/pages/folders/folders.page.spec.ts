import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FoldersPage } from './folders.page';

describe('FoldersPage', () => {
  let component: FoldersPage;
  let fixture: ComponentFixture<FoldersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoldersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FoldersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
