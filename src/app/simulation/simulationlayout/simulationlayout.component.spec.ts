import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulationlayoutComponent } from './simulationlayout.component';

describe('SimulationlayoutComponent', () => {
  let component: SimulationlayoutComponent;
  let fixture: ComponentFixture<SimulationlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimulationlayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulationlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
