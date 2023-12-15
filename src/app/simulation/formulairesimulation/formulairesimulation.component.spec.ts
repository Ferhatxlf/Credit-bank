import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulairesimulationComponent } from './formulairesimulation.component';

describe('FormulairesimulationComponent', () => {
  let component: FormulairesimulationComponent;
  let fixture: ComponentFixture<FormulairesimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormulairesimulationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormulairesimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
