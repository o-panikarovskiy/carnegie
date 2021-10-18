import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGenesComponent } from './upload-genes.component';

describe('UploadGenesComponent', () => {
  let component: UploadGenesComponent;
  let fixture: ComponentFixture<UploadGenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadGenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
