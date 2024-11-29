export type ExprTree = {
  label: string;
  value: boolean | null;
  children: ExprTree[];
};
