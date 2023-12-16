import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesdossierComponent } from './mesdossier.component';

describe('MesdossierComponent', () => {
  let component: MesdossierComponent;
  let fixture: ComponentFixture<MesdossierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesdossierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesdossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
