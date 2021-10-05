export type IStringTMap<T> = { [key: string]: T };
export type INumberTMap<T> = { [key: number]: T };

export type StringAnyMap = IStringTMap<any>;
export type NumberAnyMap = INumberTMap<any>;

export type StringStringMap = IStringTMap<string>;
export type NumberStringMap = INumberTMap<string>;

export type StringNumberMap = IStringTMap<number>;
export type NumberNumberMap = INumberTMap<number>;

export type StringBooleanMap = IStringTMap<boolean>;
export type NumberBooleanMap = INumberTMap<boolean>;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PickRequired<T, TRequired extends keyof T> = Partial<T> & Pick<T, TRequired>;
