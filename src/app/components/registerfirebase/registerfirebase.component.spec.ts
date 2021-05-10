import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterfirebaseComponent } from './registerfirebase.component';

describe('RegisterfirebaseComponent', () => {
  let component: RegisterfirebaseComponent;
  let fixture: ComponentFixture<RegisterfirebaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterfirebaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterfirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
