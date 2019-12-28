import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SellerPersonalPage } from './seller-personal.page';

describe('SellerPersonalPage', () => {
  let component: SellerPersonalPage;
  let fixture: ComponentFixture<SellerPersonalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPersonalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SellerPersonalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
