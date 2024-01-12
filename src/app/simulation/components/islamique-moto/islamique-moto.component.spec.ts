import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IslamiqueMotoComponent } from './islamique-moto.component';

describe('IslamiqueMotoComponent', () => {
  let component: IslamiqueMotoComponent;
  let fixture: ComponentFixture<IslamiqueMotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IslamiqueMotoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IslamiqueMotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
