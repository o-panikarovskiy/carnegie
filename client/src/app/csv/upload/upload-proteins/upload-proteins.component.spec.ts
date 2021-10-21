import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadProteinsComponent } from './upload-proteins.component';

describe('UploadProteinsComponent', () => {
  let component: UploadProteinsComponent;
  let fixture: ComponentFixture<UploadProteinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadProteinsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProteinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
