import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditrecipepopupComponent } from './editrecipepopup.component';

describe('EditrecipepopupComponent', () => {
  let component: EditrecipepopupComponent;
  let fixture: ComponentFixture<EditrecipepopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditrecipepopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditrecipepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
