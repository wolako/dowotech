import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfrastructureReseauComponent } from './infrastructure-reseau.component';

describe('InfrastructureReseauComponent', () => {
  let component: InfrastructureReseauComponent;
  let fixture: ComponentFixture<InfrastructureReseauComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfrastructureReseauComponent]
    });
    fixture = TestBed.createComponent(InfrastructureReseauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
