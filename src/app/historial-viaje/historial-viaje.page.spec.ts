import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialViajePage } from './historial-viaje.page';

describe('HistorialViajePage', () => {
  let component: HistorialViajePage;
  let fixture: ComponentFixture<HistorialViajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HistorialViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
