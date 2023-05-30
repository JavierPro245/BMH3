import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitarVehiculoPage } from './solicitar-vehiculo.page';

describe('SolicitarVehiculoPage', () => {
  let component: SolicitarVehiculoPage;
  let fixture: ComponentFixture<SolicitarVehiculoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SolicitarVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
