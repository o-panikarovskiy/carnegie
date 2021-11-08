import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AppError } from 'src/app/core/typings/common';
import { ImportParams, ImportsService, ImportState } from 'src/app/csv/services/imports.service';
import { LogMessage } from 'src/app/csv/typings/upload';
import { arrayToCSV } from 'src/app/csv/utils/array-to-csv';
import { downloadBlob } from 'src/app/csv/utils/download-blob';
import { Destroyer } from 'src/app/shared/abstract/destroyer';

@Component({
  selector: 'crng-upload-proteins',
  templateUrl: './upload-proteins.component.html',
  styleUrls: ['./upload-proteins.component.scss'],
})
export class UploadProteinsComponent extends Destroyer {
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
      .importProteins(params)
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
      ['uniProtId', 'accession', 'name', 'geneId', 'species', 'description', 'isEnzyme', 'sequence', 'length'],
      ['unique protein id', 'protein accession', 'string', 'gene accession string', 'string', 'string', 'TRUE/FALSE', 'string', 'number'],
    ]);
    downloadBlob(csv, 'proteins.csv', 'text/csv;charset=utf-8;');
  }
}
