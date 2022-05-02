import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnTaskComponent } from './column-task.component';

describe('ColumnTaskComponent', () => {
  let component: ColumnTaskComponent;
  let fixture: ComponentFixture<ColumnTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
