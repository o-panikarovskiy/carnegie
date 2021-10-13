import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthUser, SingInReq } from 'src/app/core/typings/auth';

@Injectable()
export class AuthBackendService {
  constructor(private readonly http: HttpClient) {}

  signIn(req: SingInReq): Observable<AuthUser> {
    return this.http.post('/api/auth/signin', req).pipe(
      map((res: any) => {
        return res.user;
      }),
    );
  }
}
