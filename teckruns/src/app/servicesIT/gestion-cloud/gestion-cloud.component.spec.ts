import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCloudComponent } from './gestion-cloud.component';

describe('GestionCloudComponent', () => {
  let component: GestionCloudComponent;
  let fixture: ComponentFixture<GestionCloudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCloudComponent]
    });
    fixture = TestBed.createComponent(GestionCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
