import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentSnapComponent } from './moment-snap.component';

describe('MomentSnapComponent', () => {
  let component: MomentSnapComponent;
  let fixture: ComponentFixture<MomentSnapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MomentSnapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MomentSnapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
