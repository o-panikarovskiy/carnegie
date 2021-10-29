import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Message, SocketService } from 'src/app/core/services/socket.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { StronglyKeyedMap } from 'src/app/core/typings/common';
import { ImportStatus, Payload } from 'src/app/csv/typings/upload';

export const COMPLETE_IMPORT = 'import:complete';
export const COMPLETE_IMPORT_ITEM = 'import:item:complete';
export const IMPORT_STATUSES: StronglyKeyedMap<ImportStatus, string> = {
  complete: 'completed',
  uploading: 'uploading...',
  importing: 'importing...',
} as const;

export type ImportProcessToken = { fileId: string };

@Injectable()
export class ImportsService {
  constructor(
    private uploadSrv: UploadService, //
    private socketSrv: SocketService,
  ) {}

  onUploadProgress(token: ImportProcessToken): Observable<number> {
    return this.uploadSrv.progressUpload$.pipe(
      filter(({ guids }) => {
        return !!token?.fileId && guids.has(token.fileId);
      }),
      map(({ progress }) => progress),
    );
  }

  onImportProgress<T>(token: ImportProcessToken): Observable<Message<Payload<T>>> {
    return this.socketSrv.message$.pipe(
      filter((msg): msg is Message<Payload<T>> => {
        return !!token?.fileId && msg.payload?.fileId === token.fileId;
      }),
    );
  }

  importGenes(file: File): Observable<ImportProcessToken> {
    return this.uploadSrv.upload<ImportProcessToken>(`api/upload/csv`, [file], { table: 'genes' });
  }

  importProteins(file: File): Observable<ImportProcessToken> {
    return this.uploadSrv.upload<ImportProcessToken>(`api/upload/csv`, [file], { table: 'proteins' });
  }

  importLocalizations(file: File): Observable<ImportProcessToken> {
    return this.uploadSrv.upload<ImportProcessToken>(`api/upload/csv`, [file], { table: 'localizations' });
  }
}
