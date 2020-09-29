import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WaiterPage } from './waiter.page';

describe('WaiterPage', () => {
  let component: WaiterPage;
  let fixture: ComponentFixture<WaiterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WaiterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
