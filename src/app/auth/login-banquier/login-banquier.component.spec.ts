import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBanquierComponent } from './login-banquier.component';

describe('LoginBanquierComponent', () => {
  let component: LoginBanquierComponent;
  let fixture: ComponentFixture<LoginBanquierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginBanquierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginBanquierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
