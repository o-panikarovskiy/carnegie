import { Component, OnInit } from '@angular/core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Message, SocketService } from 'src/app/core/services/socket.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { AppError, StronglyKeyedMap } from 'src/app/core/typings/common';
import { ImportStatus, LogMessage, Payload, UploadResult } from 'src/app/csv/typings/upload';
import { formatLogMessage } from 'src/app/csv/utils/format-log-message';
import { Gene } from 'src/app/search/typings/gene';
import { Destroyer } from 'src/app/shared/abstract/destroyer';

@Component({
  selector: 'crng-upload-genes',
  templateUrl: './upload-genes.component.html',
  styleUrls: ['./upload-genes.component.scss'],
})
export class UploadGenesComponent extends Destroyer implements OnInit {
  progress = 0;
  status?: ImportStatus;
  parseError?: AppError;
  logs: readonly LogMessage[] = [];

  readonly statuses: StronglyKeyedMap<ImportStatus, string> = {
    complete: 'completed',
    uploading: 'uploading...',
    importing: 'importing...',
  };

  private fileId?: string;

  constructor(
    private uploadSrv: UploadService, //
    private socketSrv: SocketService,
  ) {
    super();
  }

  ngOnInit() {
    this.uploadSrv.progressUpload$
      .pipe(
        filter(({ guids }) => !!this.fileId && guids.has(this.fileId)),
        map(({ progress }) => progress),
        takeUntil(this.destroy$),
      )
      .subscribe((progcess) => {
        this.progress = progcess;
      });

    this.socketSrv.message$
      .pipe(
        filter((msg): msg is Message<Payload<Gene>> => !!this.fileId && msg.payload?.fileId === this.fileId),
        takeUntil(this.destroy$),
      )
      .subscribe(({ event, payload }) => {
        if (event === 'import:item:complete') {
          this.progress = payload.progress;
          this.logs = [formatLogMessage(payload), ...this.logs];
        } else if (event === 'import:complete') {
          this.progress = 100;
          this.status = 'complete';
        }
      });
  }

  fileSelect(file: File) {
    this.logs = [];
    this.progress = 0;
    this.fileId = void 0;
    this.parseError = void 0;
    this.status = 'uploading';

    this.uploadSrv
      .upload<UploadResult>(`api/upload/genes`, [file])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ({ fileId }) => {
          this.fileId = fileId;
          this.status = 'importing';
        },
        (err: AppError) => {
          this.parseError = err;
        },
      );
  }

  identify(index: number): number {
    return index;
  }
}
