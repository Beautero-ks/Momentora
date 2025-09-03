import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentSnapListComponent } from './moment-snap-list.component';

describe('MomentSnapListComponent', () => {
  let component: MomentSnapListComponent;
  let fixture: ComponentFixture<MomentSnapListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MomentSnapListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MomentSnapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
