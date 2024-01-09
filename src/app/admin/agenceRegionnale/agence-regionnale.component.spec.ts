import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceRegionnaleComponent } from './agence-regionnale.component';

describe('AgenceRegionnaleComponent', () => {
  let component: AgenceRegionnaleComponent;
  let fixture: ComponentFixture<AgenceRegionnaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgenceRegionnaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgenceRegionnaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
