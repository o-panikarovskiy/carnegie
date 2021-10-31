import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export type DoneEvent = {
  file: File;
  separator: string;
};

export type SeparatorItem = {
  readonly label: string;
  readonly id: string;
};

const SEPARATOR_ITEMS: readonly SeparatorItem[] = [
  {
    id: ',',
    label: 'Comma ,',
  },
  {
    id: ';',
    label: 'Semicolon ;',
  },
] as const;

@Component({
  selector: 'crng-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss'],
})
export class UploadFormComponent {
  @Output() done = new EventEmitter<DoneEvent>();
  @Output() sample = new EventEmitter<void>();

  readonly separatorItems = SEPARATOR_ITEMS;
  readonly form = new FormGroup({
    file: new FormControl(void 0, { validators: Validators.required }),
    separator: new FormControl(SEPARATOR_ITEMS[0].id),
  });

  constructor() {}

  downloadSample(e: MouseEvent) {
    e.preventDefault();
    this.sample.next();
  }

  start() {
    if (this.form.invalid) return;
    this.done.next(this.form.value);
  }
}
