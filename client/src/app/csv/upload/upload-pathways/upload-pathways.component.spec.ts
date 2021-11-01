import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadPathwaysComponent } from './upload-pathways.component';

describe('UploadPathwaysComponent', () => {
  let component: UploadPathwaysComponent;
  let fixture: ComponentFixture<UploadPathwaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadPathwaysComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadPathwaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
