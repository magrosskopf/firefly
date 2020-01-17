import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingsFencePage } from './settings-fence.page';

describe('SettingsFencePage', () => {
  let component: SettingsFencePage;
  let fixture: ComponentFixture<SettingsFencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsFencePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsFencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
