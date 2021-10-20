import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AppError } from 'src/app/core/typings/common';
import { COMPLETE_IMPORT, COMPLETE_IMPORT_ITEM, ImportProcessToken, ImportsService, IMPORT_STATUSES } from 'src/app/csv/services/imports.service';
import { ImportStatus, LogMessage, Payload } from 'src/app/csv/typings/upload';
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
  readonly statuses = IMPORT_STATUSES;

  private readonly impToken: ImportProcessToken = { fileId: '' };

  constructor(private importsSrv: ImportsService) {
    super();
  }

  ngOnInit() {
    this.importsSrv
      .onUploadProgress(this.impToken)
      .pipe(takeUntil(this.destroy$))
      .subscribe((progress) => {
        this.status = 'uploading';
        this.progress = progress;
      });

    this.importsSrv
      .onImportProgress<Gene>(this.impToken)
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ event, payload }) => {
        this.progress = payload.progress;
        if (event === COMPLETE_IMPORT) {
          this.status = 'complete';
        } else if (event === COMPLETE_IMPORT_ITEM) {
          this.status = 'importing';
          this.logs = [this.formatLogMessage(payload), ...this.logs];
        }
      });
  }

  fileSelect(file: File) {
    this.logs = [];
    this.progress = 0;
    this.parseError = void 0;
    this.status = 'uploading';
    this.impToken.fileId = file.name;

    this.importsSrv
      .importGenes(file)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        ({ fileId }) => {
          this.impToken.fileId = fileId;
        },
        (err: AppError) => {
          this.status = void 0;
          this.parseError = err;
        },
      );
  }

  identify(index: number, log: LogMessage): string | number {
    return log.id || index;
  }

  private formatLogMessage({ error, rowNum, item }: Payload<Gene>): LogMessage {
    const rowStr = `Row ${rowNum}:`;

    let id = '';
    let message = '';
    if (error) {
      id = rowNum + '';
      message = `${rowStr} ${error.message}`;
    } else if (item) {
      id = item.id;
      message = `${rowStr} ${item.name || item.accession} imported successfully`;
    }

    return { error: !!error, message, id };
  }
}
