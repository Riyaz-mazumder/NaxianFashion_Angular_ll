import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrakcByAdminComponent } from './trakc-by-admin.component';

describe('TrakcByAdminComponent', () => {
  let component: TrakcByAdminComponent;
  let fixture: ComponentFixture<TrakcByAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrakcByAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrakcByAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
