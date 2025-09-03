import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMomentSnapComponent } from './single-moment-snap.component';

describe('MomentSnapComponent', () => {
  let component: SingleMomentSnapComponent;
  let fixture: ComponentFixture<SingleMomentSnapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleMomentSnapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleMomentSnapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
