import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AppError } from 'src/app/core/typings/common';
import { ImportParams, ImportsService, ImportState } from 'src/app/csv/services/imports.service';
import { LogMessage } from 'src/app/csv/typings/upload';
import { arrayToCSV } from 'src/app/csv/utils/array-to-csv';
import { downloadBlob } from 'src/app/csv/utils/download-blob';
import { Destroyer } from 'src/app/shared/abstract/destroyer';

@Component({
  selector: 'crng-upload-domains',
  templateUrl: './upload-domains.component.html',
  styleUrls: ['./upload-domains.component.scss'],
})
export class UploadDomainsComponent extends Destroyer {
  state: ImportState = {};
  error?: AppError;
  logs: readonly LogMessage[] = [];

  constructor(private importsSrv: ImportsService) {
    super();
  }

  startImport(params: ImportParams) {
    this.logs = [];
    this.state = {};
    this.error = void 0;

    this.importsSrv
      .importDomains(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (state) => {
          this.state = state;
          this.logs = state.logMsg ? [state.logMsg, ...this.logs] : this.logs;
        },
        (err: AppError) => {
          this.state = {};
          this.error = err;
        },
      );
  }

  sendSample() {
    const csv = arrayToCSV([
      ['interproId', 'name', 'proteinId'], //
      ['string', 'string', 'protein id'],
    ]);
    downloadBlob(csv, 'domains.csv', 'text/csv;charset=utf-8;');
  }
}
