export type AuthUser = {
  readonly email: string;
  readonly name?: string;
};

export type SingInReq = {
  readonly email: string;
  readonly password: string;
};
