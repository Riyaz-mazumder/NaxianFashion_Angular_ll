import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfrmeEmailComponent } from './confrme-email.component';

describe('ConfrmeEmailComponent', () => {
  let component: ConfrmeEmailComponent;
  let fixture: ComponentFixture<ConfrmeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfrmeEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfrmeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
