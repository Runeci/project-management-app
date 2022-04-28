import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBoardComponent } from './add-new-board.component';

describe('AddNewBoardComponent', () => {
  let component: AddNewBoardComponent;
  let fixture: ComponentFixture<AddNewBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
