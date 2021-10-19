import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { StronglyKeyedMap } from 'src/app/core/typings/common';
import { CSVImportService, GenePayload, ImportStatus } from 'src/app/csv/services/import.service';
import { Destroyer } from 'src/app/shared/abstract/destroyer';

const progressStatuses: StronglyKeyedMap<ImportStatus, string> = {
  complete: 'completed',
  uploading: 'uploading...',
  importing: 'importing...',
};

@Component({
  selector: 'crng-upload-genes',
  templateUrl: './upload-genes.component.html',
  styleUrls: ['./upload-genes.component.scss'],
})
export class UploadGenesComponent extends Destroyer {
  showProgress = false;
  logs: readonly GenePayload[] = [];
  readonly statuses = progressStatuses;

  constructor(public importSrv: CSVImportService) {
    super();
  }

  onFileSelect(file: File) {
    this.logs = [];
    this.showProgress = true;

    this.importSrv
      .importGenes(file)
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ payload }) => {
        this.logs = [payload, ...this.logs];
      });
  }

  identify(index: number): number {
    return index;
  }
}
