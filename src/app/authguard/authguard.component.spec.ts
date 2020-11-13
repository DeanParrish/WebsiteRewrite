import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuthguardComponent } from './authguard.component';

describe('AuthguardComponent', () => {
  let component: AuthguardComponent;
  let fixture: ComponentFixture<AuthguardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthguardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthguardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
