import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollemntsComponent } from './enrollemnts.component';

describe('EnrollemntsComponent', () => {
  let component: EnrollemntsComponent;
  let fixture: ComponentFixture<EnrollemntsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollemntsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollemntsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
