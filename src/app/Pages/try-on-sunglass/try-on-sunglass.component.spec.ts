import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryOnSunglassComponent } from './try-on-sunglass.component';

describe('TryOnSunglassComponent', () => {
  let component: TryOnSunglassComponent;
  let fixture: ComponentFixture<TryOnSunglassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TryOnSunglassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TryOnSunglassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
