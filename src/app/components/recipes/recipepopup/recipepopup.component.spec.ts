import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecipepopupComponent } from './recipepopup.component';

describe('RecipepopupComponent', () => {
  let component: RecipepopupComponent;
  let fixture: ComponentFixture<RecipepopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipepopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
