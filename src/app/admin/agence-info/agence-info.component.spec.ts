import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenceInfoComponent } from './agence-info.component';

describe('AgenceInfoComponent', () => {
  let component: AgenceInfoComponent;
  let fixture: ComponentFixture<AgenceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgenceInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgenceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
