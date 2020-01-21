import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditDealPage } from './edit-deal.page';

describe('EditDealPage', () => {
  let component: EditDealPage;
  let fixture: ComponentFixture<EditDealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDealPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
