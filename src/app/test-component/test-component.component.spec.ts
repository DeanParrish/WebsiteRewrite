import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TestComponentComponent } from './test-component.component';

describe('TestComponentComponent', () => {
  let component: TestComponentComponent;
  let fixture: ComponentFixture<TestComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
