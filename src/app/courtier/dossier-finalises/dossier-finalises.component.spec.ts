import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierFinalisesComponent } from './dossier-finalises.component';

describe('DossierFinalisesComponent', () => {
  let component: DossierFinalisesComponent;
  let fixture: ComponentFixture<DossierFinalisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DossierFinalisesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DossierFinalisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
