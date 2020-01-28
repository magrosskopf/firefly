import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailStorePage } from './detail-store.page';

describe('DetailStorePage', () => {
  let component: DetailStorePage;
  let fixture: ComponentFixture<DetailStorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailStorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
