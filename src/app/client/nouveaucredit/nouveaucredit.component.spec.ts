import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveaucreditComponent } from './nouveaucredit.component';

describe('NouveaucreditComponent', () => {
  let component: NouveaucreditComponent;
  let fixture: ComponentFixture<NouveaucreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NouveaucreditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NouveaucreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
