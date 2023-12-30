import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IslamiqueVehiculeComponent } from './islamique-vehicule.component';

describe('IslamiqueVehiculeComponent', () => {
  let component: IslamiqueVehiculeComponent;
  let fixture: ComponentFixture<IslamiqueVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IslamiqueVehiculeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IslamiqueVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
