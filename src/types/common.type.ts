export type FindAllResponse<T> = { count: number; items: T[] };

export type FindOneResponse<T> = T | null;

export type CreateResponse<T> = T;

export type UpdateResponse<T> = T | null;

export type DeleteResponse = boolean;
