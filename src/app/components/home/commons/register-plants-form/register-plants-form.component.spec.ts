import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPlantsFormComponent } from './register-plants-form.component';

describe('RegisterPlantsFormComponent', () => {
  let component: RegisterPlantsFormComponent;
  let fixture: ComponentFixture<RegisterPlantsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPlantsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterPlantsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
