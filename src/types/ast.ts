export type ExprTree = {
  label: string;
  isError?: boolean | undefined;
  children: ExprTree[];
  value: boolean | null;
  order: number;
};
