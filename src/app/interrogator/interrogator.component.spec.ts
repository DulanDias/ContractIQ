import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterrogatorComponent } from './interrogator.component';

describe('InterrogatorComponent', () => {
  let component: InterrogatorComponent;
  let fixture: ComponentFixture<InterrogatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterrogatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterrogatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
