export type Maybe<T> =
  | ({
      ok: true;
    } & Omit<T, "ok">)
  | {
      ok: false;
    };

export type MaybeOr<T, K> =
  | ({
      ok: true;
    } & Omit<T, "ok">)
  | ({
      ok: false;
    } & Omit<K, "ok">);

export type ArrayElement<T> = T extends Array<infer U>
  ? U
  : never;
