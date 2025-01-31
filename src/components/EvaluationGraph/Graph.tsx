import { ExprTree } from "$types/expression-tree";
import { SymbolTable } from "$types/syntax-tree";
import { Paper, Stack, SxProps } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { GraphControl } from "./GraphControl";
import { Tree } from "./Tree";

type GraphProps = {
  exprTree: ExprTree;
  symbolTable: SymbolTable;
  slotProps: {
    container: SxProps;
  };
};
export const Graph: FC<GraphProps> = (props) => {
  const { exprTree, symbolTable, slotProps } = props;

  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(isPlaying);
  const currentFrameRef = useRef(step);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    currentFrameRef.current = step;
  }, [step]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        if (isPlayingRef.current) {
          setStep((prev) => {
            if (prev < maxStep) {
              return prev + 1;
            }
            setIsPlaying(false);
            isPlayingRef.current = false;
            return prev;
          });
        }
      }, 750);
    }
    return () =>
      clearInterval(intervalRef.current ?? undefined);
  }, [isPlaying, maxStep, step]);

  useEffect(() => {
    setStep(1);
    setMaxStep(exprTree.order + 1);
  }, [exprTree]);

  return (
    <Stack spacing={1}>
      <Paper
        variant="outlined"
        sx={slotProps.container}
      >
        <Tree
          order={step}
          tree={exprTree}
          symbolTable={symbolTable}
        />
      </Paper>
      <GraphControl
        maxValue={maxStep}
        minValue={1}
        value={step}
        onChange={setStep}
        isAnimationPlaying={isPlaying}
        onAnimationPause={() => {
          setIsPlaying(false);
        }}
        onAnimationPlay={() => {
          setIsPlaying(true);
        }}
        onAnimationReplay={() => {
          setStep(1);
          setIsPlaying(true);
        }}
      />
    </Stack>
  );
};
