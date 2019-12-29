import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SellerBusinessPage } from './seller-business.page';

describe('SellerBusinessPage', () => {
  let component: SellerBusinessPage;
  let fixture: ComponentFixture<SellerBusinessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerBusinessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SellerBusinessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
