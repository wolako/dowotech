import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtoutComponent } from './atout.component';

describe('AtoutComponent', () => {
  let component: AtoutComponent;
  let fixture: ComponentFixture<AtoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtoutComponent]
    });
    fixture = TestBed.createComponent(AtoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
