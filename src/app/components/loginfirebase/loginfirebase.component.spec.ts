import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginfirebaseComponent } from './loginfirebase.component';

describe('LoginfirebaseComponent', () => {
  let component: LoginfirebaseComponent;
  let fixture: ComponentFixture<LoginfirebaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginfirebaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginfirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
