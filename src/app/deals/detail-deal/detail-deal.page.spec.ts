import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailDealPage } from './detail-deal.page';

describe('DetailDealPage', () => {
  let component: DetailDealPage;
  let fixture: ComponentFixture<DetailDealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDealPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailDealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
