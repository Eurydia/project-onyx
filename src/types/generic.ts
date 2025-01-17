export type Maybe<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
    };

export type MaybeOr<T, K> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      other: K;
    };
