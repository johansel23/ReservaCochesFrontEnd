import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaCocheComponent } from './reserva-coche.component';

describe('ReservaCocheComponent', () => {
  let component: ReservaCocheComponent;
  let fixture: ComponentFixture<ReservaCocheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaCocheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaCocheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
