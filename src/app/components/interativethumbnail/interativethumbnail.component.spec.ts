import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InterativethumbnailComponent } from './interativethumbnail.component';

describe('InterativethumbnailComponent', () => {
  let component: InterativethumbnailComponent;
  let fixture: ComponentFixture<InterativethumbnailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InterativethumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterativethumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
