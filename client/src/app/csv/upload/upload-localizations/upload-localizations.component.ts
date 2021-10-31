import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AppError } from 'src/app/core/typings/common';
import { Localization } from 'src/app/core/typings/localization';
import { COMPLETE_IMPORT, COMPLETE_IMPORT_ITEM, ImportProcessToken, ImportsService, IMPORT_STATUSES } from 'src/app/csv/services/imports.service';
import { ImportStatus, LogMessage, Payload } from 'src/app/csv/typings/upload';
import { DoneEvent } from 'src/app/csv/upload/upload-form/upload-form.component';
import { arrayToCSV } from 'src/app/csv/utils/array-to-csv';
import { downloadBlob } from 'src/app/csv/utils/download-blob';
import { Destroyer } from 'src/app/shared/abstract/destroyer';

@Component({
  selector: 'crng-upload-localizations',
  templateUrl: './upload-localizations.component.html',
  styleUrls: ['./upload-localizations.component.scss'],
})
export class UploadLocalizationsComponent extends Destroyer implements OnInit {
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
      .onImportProgress<Localization>(this.impToken)
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

  startImport({ file, separator }: DoneEvent) {
    this.logs = [];
    this.progress = 0;
    this.parseError = void 0;
    this.status = 'uploading';
    this.impToken.fileId = file.name;

    this.importsSrv
      .importLocalizations(file, separator)
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

  sendSample() {
    const csv = arrayToCSV([
      ['proteinId', 'organelleId', 'pubMedId', 'methodId'],
      ['protein id', 'organelle id', 'string', 'method type'],
    ]);

    downloadBlob(csv, 'localizations.csv', 'text/csv;charset=utf-8;');
  }

  private formatLogMessage({ error, rowNum, item: loc }: Payload<Localization>): LogMessage {
    const rowStr = `Row ${rowNum}:`;

    let id = '';
    let message = '';
    if (error) {
      id = rowNum + '';
      message = `${rowStr} ${error.message || error.code || ''}`;
    } else if (loc) {
      message = `${rowStr} ${JSON.stringify(loc)} imported successfully`;
    }

    return { error: !!error, message, id };
  }
}
