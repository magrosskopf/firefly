import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateDealPage } from './create-deal.page';

describe('CreateDealPage', () => {
  let component: CreateDealPage;
  let fixture: ComponentFixture<CreateDealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDealPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
