import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadLocalizationsComponent } from './upload-localizations.component';

describe('UploadLocalizationsComponent', () => {
  let component: UploadLocalizationsComponent;
  let fixture: ComponentFixture<UploadLocalizationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadLocalizationsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadLocalizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
