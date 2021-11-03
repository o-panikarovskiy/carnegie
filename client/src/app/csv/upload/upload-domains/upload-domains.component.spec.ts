import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadDomainsComponent } from './upload-domains.component';

describe('UploadDomainsComponent', () => {
  let component: UploadDomainsComponent;
  let fixture: ComponentFixture<UploadDomainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadDomainsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
