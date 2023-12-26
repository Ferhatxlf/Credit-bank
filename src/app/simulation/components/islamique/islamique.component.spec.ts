import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IslamiqueComponent } from './islamique.component';

describe('IslamiqueComponent', () => {
  let component: IslamiqueComponent;
  let fixture: ComponentFixture<IslamiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IslamiqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IslamiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
