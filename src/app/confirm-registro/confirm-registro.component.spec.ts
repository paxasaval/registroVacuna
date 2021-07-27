import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRegistroComponent } from './confirm-registro.component';

describe('ConfirmRegistroComponent', () => {
  let component: ConfirmRegistroComponent;
  let fixture: ComponentFixture<ConfirmRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
