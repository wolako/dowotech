import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureITComponent } from './infrastructure-it.component';

describe('InfrastructureITComponent', () => {
  let component: InfrastructureITComponent;
  let fixture: ComponentFixture<InfrastructureITComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfrastructureITComponent]
    });
    fixture = TestBed.createComponent(InfrastructureITComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
