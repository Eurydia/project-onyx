import { ExprTree } from "$types/expression-tree";
import { SymbolTable } from "$types/syntax-tree";
import { Paper, Stack } from "@mui/material";
import {
  FC,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { PlaygroundPlaybackControl } from "./PlaygroundPlaybackControl";
import { TreeGraph } from "./TreeGraph/TreeGraph";

type PlaygroundProps = {
  exprTree: ExprTree;
  symbolTable: SymbolTable;
};
export const Playground: FC<PlaygroundProps> = (props) => {
  const { exprTree, symbolTable } = props;
  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);

  useEffect(() => {
    setStep(1);
    setMaxStep(exprTree.order + 1);
  }, [exprTree]);

  const handleGraphKeyPress = (
    e: KeyboardEvent<SVGSVGElement>
  ) => {
    const { key } = e;
    if (key === "ArrowUp" || key === "ArrowRight") {
      e.preventDefault();
      setStep((prev) => Math.min(maxStep, prev + 1));
    } else if (key === "ArrowLeft" || key === "ArrowDown") {
      e.preventDefault();
      setStep((prev) => Math.max(1, prev - 1));
    }
  };

  return (
    <Stack spacing={1}>
      <Paper
        elevation={0}
        sx={{
          height: "75vh",
          width: "100%",
          borderRadius: ({ shape }) => shape.borderRadius,
          backgroundColor: ({ palette }) =>
            palette.background.default,
        }}
      >
        <TreeGraph
          order={step}
          tree={exprTree}
          onKeyDown={handleGraphKeyPress}
          symbolTable={symbolTable}
        />
      </Paper>
      <PlaygroundPlaybackControl
        maxValue={maxStep}
        minValue={1}
        value={step}
        onChange={setStep}
      />
    </Stack>
  );
};
