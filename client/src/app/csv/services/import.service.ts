import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMapTo, take, takeUntil, tap } from 'rxjs/operators';
import { Message, SocketService } from 'src/app/core/services/socket.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { AppError } from 'src/app/core/typings/common';
import { Gene } from 'src/app/search/typings/gene';

export type ImportStatus = 'uploading' | 'importing' | 'complete';
export type UploadResult = { fileId: string };

export type Payload = { fileId: string; progress: number; error?: AppError };
export type GenePayload = Payload & { gene?: Gene };

@Injectable()
export class CSVImportService {
  private progressSubj = new BehaviorSubject<number>(0);
  private statusSubj = new BehaviorSubject<ImportStatus | undefined>(void 0);

  readonly status$ = this.statusSubj.asObservable();
  readonly progress$ = this.progressSubj.asObservable();

  constructor(
    private uploadSrv: UploadService, //
    private socketSrv: SocketService,
  ) {}

  importGenes(file: File): Observable<Message<GenePayload>> {
    return this.start(`api/upload/genes`, file);
  }

  private start(url: string, file: File): Observable<Message> {
    const upload$ = this.uploadSrv.upload<UploadResult>(url, [file]).pipe(
      tap(({ fileId }) => {
        _fileId = fileId;
        this.statusSubj.next('importing');
      }),
    );

    const uploadProgress$ = this.uploadSrv.progressUpload$.pipe(
      filter(({ guids }) => guids.has(file.name)),
      map(({ progress }) => progress),
      tap((progress) => {
        this.progressSubj.next(progress);
      }),
      takeUntil(upload$),
    );

    const complete$ = this.statusSubj.pipe(
      filter((v) => v === 'complete'),
      take(1),
    );

    const import$ = this.socketSrv.message$.pipe(
      filter(({ payload }) => payload?.fileId === _fileId),
      tap(({ event, payload }) => {
        if (event === 'import:item:complete') {
          this.progressSubj.next(payload.progress);
        } else if (event === 'import:complete') {
          this.progressSubj.next(100);
          this.statusSubj.next('complete');
        }
      }),
      takeUntil(complete$),
    );

    let _fileId: string;
    this.progressSubj.next(0);
    this.statusSubj.next('uploading');
    return uploadProgress$.pipe(switchMapTo(import$));
  }
}
