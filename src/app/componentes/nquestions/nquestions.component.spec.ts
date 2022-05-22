import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NquestionsComponent } from './nquestions.component';

describe('NquestionsComponent', () => {
  let component: NquestionsComponent;
  let fixture: ComponentFixture<NquestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NquestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
