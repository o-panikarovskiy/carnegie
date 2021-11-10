import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadReactionsComponent } from './upload-reactions.component';

describe('UploadReactionsComponent', () => {
  let component: UploadReactionsComponent;
  let fixture: ComponentFixture<UploadReactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadReactionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadReactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
