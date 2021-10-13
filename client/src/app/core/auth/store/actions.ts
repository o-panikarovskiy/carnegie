import { createAction, props } from '@ngrx/store';
import { AuthUser, SingInReq } from 'src/app/core/typings/auth';
import { ErrorResponse } from 'src/app/core/typings/common';

export const signIn = createAction('[Auth] signin', props<{ req: SingInReq }>());
export const signInError = createAction('[Auth] signin error', props<{ error: ErrorResponse }>());
export const signInSuccess = createAction('[Auth] signin success', props<{ user: AuthUser }>());
