import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutlinkComponent } from './logoutlink.component';

describe('LogoutlinkComponent', () => {
  let component: LogoutlinkComponent;
  let fixture: ComponentFixture<LogoutlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
