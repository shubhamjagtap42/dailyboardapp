import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycasesComponent } from './mycases.component';

describe('MycasesComponent', () => {
  let component: MycasesComponent;
  let fixture: ComponentFixture<MycasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MycasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
