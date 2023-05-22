import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackMyOrderDetailsComponent } from './track-my-order-details.component';

describe('TrackMyOrderDetailsComponent', () => {
  let component: TrackMyOrderDetailsComponent;
  let fixture: ComponentFixture<TrackMyOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackMyOrderDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackMyOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
