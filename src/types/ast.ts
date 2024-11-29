export type ExprTree = {
  name: string;
  value: boolean | null;
  children: ExprTree[];
};
