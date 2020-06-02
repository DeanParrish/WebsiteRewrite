import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterativethumbnailComponent } from './interativethumbnail.component';

describe('InterativethumbnailComponent', () => {
  let component: InterativethumbnailComponent;
  let fixture: ComponentFixture<InterativethumbnailComponent>;

  beforeEach(async(() => {
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
