import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeForRegisterComponent } from './notice-for-register.component';

describe('NoticeForRegisterComponent', () => {
  let component: NoticeForRegisterComponent;
  let fixture: ComponentFixture<NoticeForRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoticeForRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoticeForRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
