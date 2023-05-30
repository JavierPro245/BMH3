import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicidudesViajesPage } from './solicidudes-viajes.page';

describe('SolicidudesViajesPage', () => {
  let component: SolicidudesViajesPage;
  let fixture: ComponentFixture<SolicidudesViajesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SolicidudesViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
