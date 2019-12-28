import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyerPage } from './buyer.page';

describe('BuyerPage', () => {
  let component: BuyerPage;
  let fixture: ComponentFixture<BuyerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
