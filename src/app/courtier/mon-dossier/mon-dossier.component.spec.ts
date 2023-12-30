import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonDossierComponent } from './mon-dossier.component';

describe('MonDossierComponent', () => {
  let component: MonDossierComponent;
  let fixture: ComponentFixture<MonDossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonDossierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
