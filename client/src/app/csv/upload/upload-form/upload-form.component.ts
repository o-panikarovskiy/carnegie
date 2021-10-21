import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'crng-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent {
  @Output() done = new EventEmitter<File>();
  @Output() sample = new EventEmitter<void>();

  file?: File;

  form = new FormGroup({
    file: new FormControl(void 0, { validators: Validators.required }),
    separator: new FormControl(),
  });

  constructor() {}

  downloadSample(e: MouseEvent) {
    e.preventDefault();
    this.sample.next();
  }
}
