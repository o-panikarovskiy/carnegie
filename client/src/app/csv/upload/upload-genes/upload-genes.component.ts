import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { SocketService } from 'src/app/core/services/socket.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { Destroyer } from 'src/app/shared/abstract/destroyer';
import { createGuid } from 'src/app/shared/utils/crypto-utils';

@Component({
  selector: 'crng-upload-genes',
  templateUrl: './upload-genes.component.html',
  styleUrls: ['./upload-genes.component.scss'],
})
export class UploadGenesComponent extends Destroyer implements OnInit {
  progress = 0;
  showProgress = false;
  progressStatus = 'Uploading...';

  private fileGuid = '';

  constructor(
    private uploadSrv: UploadService, //
    private socketSrv: SocketService,
  ) {
    super();
  }

  ngOnInit() {
    this.uploadSrv.progressUpload$.pipe(takeUntil(this.destroy$)).subscribe((e) => {
      if (e.guids.has(this.fileGuid)) {
        this.progress = e.progress;
      }
    });

    this.socketSrv.message$.pipe(takeUntil(this.destroy$)).subscribe(({ message, payload }) => {
      console.log(message, payload);
    });
  }

  onFileSelect(file: File) {
    this.showProgress = true;
    this.fileGuid = createGuid();

    const files = [file];
    const guids = [this.fileGuid];

    this.uploadSrv
      .upload('api/upload/genes', files, { guids })
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.progress = 0;
        this.progressStatus = 'Importing...';
      });
  }
}
