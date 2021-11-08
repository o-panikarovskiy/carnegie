import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ImportsService } from 'src/app/csv/services/imports.service';
import { Destroyer } from 'src/app/shared/abstract/destroyer';

@Component({
  selector: 'crng-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent extends Destroyer implements OnInit {
  public isConnected = false;
  constructor(private readonly impService: ImportsService) {
    super();
  }

  ngOnInit() {
    this.impService
      .connect()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.isConnected = true;
      });
  }
}
