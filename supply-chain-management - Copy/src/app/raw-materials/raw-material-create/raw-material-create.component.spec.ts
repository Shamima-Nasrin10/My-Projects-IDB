import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialCreateComponent } from './raw-material-create.component';

describe('RawMaterialCreateComponent', () => {
  let component: RawMaterialCreateComponent;
  let fixture: ComponentFixture<RawMaterialCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RawMaterialCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
