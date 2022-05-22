import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUsuComponent } from './menu-usu.component';

describe('MenuUsuComponent', () => {
  let component: MenuUsuComponent;
  let fixture: ComponentFixture<MenuUsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuUsuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuUsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
