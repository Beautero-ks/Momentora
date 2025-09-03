import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityCtaComponent } from './community-cta.component';

describe('CommunityCtaComponent', () => {
  let component: CommunityCtaComponent;
  let fixture: ComponentFixture<CommunityCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunityCtaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommunityCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
