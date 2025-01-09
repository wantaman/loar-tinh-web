import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingCompanyComponent } from './loading-company.component';

describe('LoadingCompanyComponent', () => {
  let component: LoadingCompanyComponent;
  let fixture: ComponentFixture<LoadingCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingCompanyComponent]
    });
    fixture = TestBed.createComponent(LoadingCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
