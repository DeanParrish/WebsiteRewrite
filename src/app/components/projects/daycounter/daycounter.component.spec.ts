import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DaycounterComponent } from './daycounter.component';

describe('DaycounterComponent', () => {
  let component: DaycounterComponent;
  let fixture: ComponentFixture<DaycounterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DaycounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaycounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
