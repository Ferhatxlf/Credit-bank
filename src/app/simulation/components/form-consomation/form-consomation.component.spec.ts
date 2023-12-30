import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConsomationComponent } from './form-consomation.component';

describe('FormConsomationComponent', () => {
  let component: FormConsomationComponent;
  let fixture: ComponentFixture<FormConsomationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormConsomationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormConsomationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
