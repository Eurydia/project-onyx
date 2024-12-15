export type Maybe<T, E> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      other: E;
    };
