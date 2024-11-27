export type ExpressionTree = {
  name: string;
  value: boolean | null;
  children: ExpressionTree[];
};
