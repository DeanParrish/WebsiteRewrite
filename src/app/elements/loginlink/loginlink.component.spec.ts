import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginlinkComponent } from './loginlink.component';

describe('LoginlinkComponent', () => {
  let component: LoginlinkComponent;
  let fixture: ComponentFixture<LoginlinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginlinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
