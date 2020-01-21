import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FactsPage } from './facts.page';

describe('FactsPage', () => {
  let component: FactsPage;
  let fixture: ComponentFixture<FactsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
