export type ExprTree = {
  label: string;
  isError?: boolean | undefined;
  children: ExprTree[];
  fn: (table: Map<string, boolean>) => boolean;
  order: number;
};
