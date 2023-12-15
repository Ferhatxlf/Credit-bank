import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsimulationComponent } from './cardsimulation.component';

describe('CardsimulationComponent', () => {
  let component: CardsimulationComponent;
  let fixture: ComponentFixture<CardsimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsimulationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardsimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
