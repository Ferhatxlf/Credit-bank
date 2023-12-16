import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresSurGageComponent } from './pres-sur-gage.component';

describe('PresSurGageComponent', () => {
  let component: PresSurGageComponent;
  let fixture: ComponentFixture<PresSurGageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresSurGageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresSurGageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
