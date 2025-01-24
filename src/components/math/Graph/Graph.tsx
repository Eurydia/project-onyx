import { ExprTree } from "$types/expression-tree";
import { SymbolTable } from "$types/syntax-tree";
import {
  Paper,
  Stack,
  SxProps,
  Theme,
} from "@mui/material";
import {
  FC,
  KeyboardEvent,
  useEffect,
  useState,
} from "react";
import { GraphControl } from "./GraphControl";
import { TreeGraph } from "./TreeGraph/TreeGraph";

type GraphProps = {
  exprTree: ExprTree;
  symbolTable: SymbolTable;
  slotProps: {
    graphRegion: SxProps<Theme>;
  };
};
export const Graph: FC<GraphProps> = (props) => {
  const { exprTree, symbolTable, slotProps } = props;

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
        variant="outlined"
        sx={slotProps.graphRegion}
      >
        <TreeGraph
          order={step}
          tree={exprTree}
          onKeyDown={handleGraphKeyPress}
          symbolTable={symbolTable}
        />
      </Paper>
      <GraphControl
        maxValue={maxStep}
        minValue={1}
        value={step}
        onChange={setStep}
      />
    </Stack>
  );
};
