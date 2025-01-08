import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetialProductComponent } from './detial-product.component';

describe('DetialProductComponent', () => {
  let component: DetialProductComponent;
  let fixture: ComponentFixture<DetialProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetialProductComponent]
    });
    fixture = TestBed.createComponent(DetialProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
