import { exprTreeCollectSymbols } from "$core/tree/expr/evaluate";
import { ExprTree } from "$types/graph";
import { Box, Divider } from "@mui/material";
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
};
export const Playground: FC<PlaygroundProps> = (props) => {
  const { exprTree } = props;
  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  // const [symbolTable, setSymbolTable] = useState(
  //   new Map<string, boolean>()
  // );

  useEffect(() => {
    setStep(1);
    setMaxStep(exprTree.order + 1);
    const nextSymbolTable = new Map<string, boolean>();
    const nextSymbols = exprTreeCollectSymbols(exprTree);
    for (const symbol of nextSymbols) {
      nextSymbolTable.set(symbol, true);
    }
    // setSymbolTable(nextSymbolTable);
  }, [exprTree]);

  // const handleSymbolChange = (k: string, v: boolean) => {
  //   setSymbolTable((prev) => {
  //     const next = new Map(prev);
  //     next.set(k, v);
  //     return next;
  //   });
  // };

  const handleGraphKeyPress = (
    e: KeyboardEvent<SVGSVGElement>
  ) => {
    const { key } = e;
    if (key === "ArrowUp" || key === "ArrowRight") {
      e.preventDefault();
      setStep((prev) => Math.min(maxStep, prev + 1));
    } else if (key === "ArrowLeft" || key === "ArrowDown") {
      e.preventDefault();
      setStep((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <Box>
      <PlaygroundPlaybackControl
        maxValue={maxStep}
        minValue={1}
        value={step}
        onChange={setStep}
      />
      <Divider flexItem />
      <Box
        height="75vh"
        width="100%"
      >
        <TreeGraph
          // symbolTable={symbolTable}
          order={step}
          tree={exprTree}
          onKeyDown={handleGraphKeyPress}
        />
      </Box>
    </Box>
  );
};
