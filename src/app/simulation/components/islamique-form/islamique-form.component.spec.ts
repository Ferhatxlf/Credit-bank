import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IslamiqueFormComponent } from './islamique-form.component';

describe('IslamiqueFormComponent', () => {
  let component: IslamiqueFormComponent;
  let fixture: ComponentFixture<IslamiqueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IslamiqueFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IslamiqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
