import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsimulationComponent } from './resultsimulation.component';

describe('ResultsimulationComponent', () => {
  let component: ResultsimulationComponent;
  let fixture: ComponentFixture<ResultsimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsimulationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultsimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
