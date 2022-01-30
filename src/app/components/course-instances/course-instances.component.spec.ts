import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInstancesComponent } from './course-instances.component';

describe('CourseInstancesComponent', () => {
  let component: CourseInstancesComponent;
  let fixture: ComponentFixture<CourseInstancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseInstancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseInstancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
