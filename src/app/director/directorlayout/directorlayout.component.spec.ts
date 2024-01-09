import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorlayoutComponent } from './directorlayout.component';

describe('DirectorlayoutComponent', () => {
  let component: DirectorlayoutComponent;
  let fixture: ComponentFixture<DirectorlayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectorlayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectorlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
