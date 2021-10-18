import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { safeJSONParse } from 'src/app/shared/utils/text-utils';

export type UploadProgressEvent = {
  progress: number;
  guids: Set<string>;
  event: ProgressEvent;
};

@Injectable()
export class UploadService {
  private readonly progress$ = new Subject<UploadProgressEvent>();

  readonly progressUpload$ = this.progress$.asObservable();

  constructor() {}

  upload(url: string, files: FileList | File[], data?: any, headers?: HttpHeaders): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const fd = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest(),
        guids = new Set<string>();

      if (data) {
        Object.keys(data).forEach((key) => {
          fd.append(key, data[key]);
        });
      }

      Array.from(files).forEach((file, idx) => {
        const guid = data && Array.isArray(data.guids) ? data.guids[idx] : file.name;
        guids.add(guid);
        fd.append('file', file);
      });

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(safeJSONParse(xhr.response));
          } else {
            const error = new HttpErrorResponse({
              error: safeJSONParse(xhr.response),
              status: xhr.status,
              statusText: xhr.statusText,
              url: xhr.responseURL,
            });

            observer.error(error);
          }
          observer.complete();
        }
      };

      xhr.upload.onprogress = (event) => {
        const progress = Math.round((event.loaded / event.total) * 100);
        this.progress$.next({ progress, event, guids });
      };

      xhr.open('POST', url, true);

      if (headers) {
        headers.keys().forEach((key) => {
          const val = headers.get(key);
          if (val) {
            xhr.setRequestHeader(key, val);
          }
        });
      }

      xhr.send(fd);

      return () => xhr.abort();
    });
  }
}
