import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Alert2DosisComponent } from './alert2-dosis.component';

describe('Alert2DosisComponent', () => {
  let component: Alert2DosisComponent;
  let fixture: ComponentFixture<Alert2DosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Alert2DosisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Alert2DosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
