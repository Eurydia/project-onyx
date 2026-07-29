import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import type { SxProps } from "@mui/material/styles";
import { type FC, useEffect, useRef, useState } from "react";
import type { ExprTree } from "$/types/expression-tree";
import type { SymbolTable } from "$/types/syntax-tree";
import { GraphControl } from "./GraphControl";
import { Tree } from "./Tree";

export const Graph: FC<{
  exprTree: ExprTree;
  symbolTable: SymbolTable;
  slotProps: {
    container: SxProps;
  };
}> = (props) => {
  const { exprTree, symbolTable, slotProps } = props;

  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const intervalRef = useRef<number | null>(null);
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
    return () => clearInterval(intervalRef.current ?? undefined);
  }, [isPlaying, maxStep]);

  useEffect(() => {
    setStep(1);
    setMaxStep(exprTree.order + 1);
  }, [exprTree]);

  return (
    <Stack spacing={1}>
      <Paper variant="outlined" sx={slotProps.container}>
        <Tree order={step} tree={exprTree} symbolTable={symbolTable} />
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
