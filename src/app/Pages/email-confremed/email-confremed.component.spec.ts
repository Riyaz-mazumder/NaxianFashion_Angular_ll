import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfremedComponent } from './email-confremed.component';

describe('EmailConfremedComponent', () => {
  let component: EmailConfremedComponent;
  let fixture: ComponentFixture<EmailConfremedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailConfremedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailConfremedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
