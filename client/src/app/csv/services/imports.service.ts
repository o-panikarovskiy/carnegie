import { Injectable } from '@angular/core';
import { Observable, pipe, UnaryFunction } from 'rxjs';
import { filter, map, switchMap, takeWhile } from 'rxjs/operators';
import { Message, SocketService } from 'src/app/core/services/socket.service';
import { UploadService } from 'src/app/core/services/upload.service';
import { Gene } from 'src/app/core/typings/gene';
import { ImportStatus, LogMessage, Payload } from 'src/app/csv/typings/upload';
import { formatLogMessage } from 'src/app/csv/utils/format-log-message';

export const COMPLETE_IMPORT = 'import:complete';
export const COMPLETE_IMPORT_ITEM = 'import:item:complete';

export type ImportProcessToken = { fileId: string };
export type ImportParams = { file: File; escape: string; delimiter: string };

export type ImportState = {
  readonly progress?: number;
  readonly status?: ImportStatus;
  readonly logMsg?: LogMessage;
};

@Injectable()
export class ImportsService {
  private readonly progressPipe: UnaryFunction<Observable<ImportProcessToken>, Observable<ImportState>>;

  constructor(
    private uploadSrv: UploadService, //
    private socketSrv: SocketService,
  ) {
    this.progressPipe = pipe(
      switchMap((token: ImportProcessToken) => {
        return this.socketSrv.message$.pipe(
          filter((msg): msg is Message<Payload<Gene>> => {
            return !!token?.fileId && msg.payload?.fileId === token.fileId;
          }),
          takeWhile((msg) => msg.event !== COMPLETE_IMPORT, true),
        );
      }),
      map(({ event, payload }): ImportState => {
        if (event === COMPLETE_IMPORT) return { status: 'complete' };

        const progress = payload.progress;
        const status: ImportStatus = 'importing';
        const logMsg = formatLogMessage(payload);
        return { progress, status, logMsg };
      }),
    );
  }

  importGenes({ file, ...params }: ImportParams): Observable<ImportState> {
    return this.uploadSrv.upload<ImportProcessToken>(`api/upload/csv`, [file], { ...params, table: 'genes' }).pipe(this.progressPipe);
  }

  importProteins({ file, ...params }: ImportParams): Observable<ImportState> {
    return this.uploadSrv.upload<ImportProcessToken>(`api/upload/csv`, [file], { ...params, table: 'proteins' }).pipe(this.progressPipe);
  }

  importLocalizations({ file, ...params }: ImportParams): Observable<ImportState> {
    return this.uploadSrv.upload<ImportProcessToken>(`api/upload/csv`, [file], { ...params, table: 'localizations' }).pipe(this.progressPipe);
  }

  importPathways({ file, ...params }: ImportParams): Observable<ImportState> {
    return this.uploadSrv.upload<ImportProcessToken>(`api/upload/csv`, [file], { ...params, table: 'pathways' }).pipe(this.progressPipe);
  }
}
