import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfessorToCourseComponent } from './add-professor-to-course.component';

describe('AddProfessorToCourseComponent', () => {
  let component: AddProfessorToCourseComponent;
  let fixture: ComponentFixture<AddProfessorToCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProfessorToCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfessorToCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
