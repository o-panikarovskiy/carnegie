import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthBackendService } from 'src/app/core/auth/services/auth-backend.service';
import { signIn, signInError, signInSuccess } from 'src/app/core/auth/store/actions';
import { selectUserSelector } from 'src/app/core/auth/store/selectors';
import { AuthUser, SingInReq } from 'src/app/core/typings/auth';
import { ErrorResponse } from 'src/app/core/typings/common';

@Injectable()
export class AuthStoreService {
  public readonly user$: Observable<AuthUser | undefined>;
  public readonly isAuthenticated$: Observable<boolean>;

  constructor(
    private readonly store: Store, //
    private readonly abs: AuthBackendService,
  ) {
    this.user$ = store.select(selectUserSelector);
    this.isAuthenticated$ = store.select(selectUserSelector).pipe(map((user) => !!user));
  }

  signIn(req: SingInReq): Observable<AuthUser> {
    this.store.dispatch(signIn({ req }));

    return this.abs.signIn(req).pipe(
      map((user) => {
        this.store.dispatch(signInSuccess({ user }));
        return user;
      }),
      catchError((error: ErrorResponse) => {
        this.store.dispatch(signInError({ error }));
        return throwError(error);
      }),
    );
  }

  checkSession(): Observable<boolean> {
    return of(false);
  }
}
