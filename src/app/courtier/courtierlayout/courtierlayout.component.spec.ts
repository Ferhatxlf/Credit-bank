import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtierlayoutComponent } from './courtierlayout.component';

describe('CourtierlayoutComponent', () => {
  let component: CourtierlayoutComponent;
  let fixture: ComponentFixture<CourtierlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourtierlayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourtierlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
