import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousReportsComponent } from './previous-reports.component';

describe('PreviousReportsComponent', () => {
  let component: PreviousReportsComponent;
  let fixture: ComponentFixture<PreviousReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
