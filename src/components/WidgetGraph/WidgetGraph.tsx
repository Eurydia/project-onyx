import { ExprTree } from "$types/expression-tree";
import { SymbolTable } from "$types/syntax-tree";
import {
  Paper,
  Stack,
  SxProps,
  Theme,
} from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { TreeGraph } from "./TreeGraph";
import { WidgetGraphControl } from "./WidgetGraphControl";

type WidgetGraphProps = {
  exprTree: ExprTree;
  symbolTable: SymbolTable;
  slotProps: {
    graphRegion: SxProps<Theme>;
  };
};
export const WidgetGraph: FC<WidgetGraphProps> = (
  props
) => {
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
  }, [isPlaying, maxStep]);

  useEffect(() => {
    setStep(1);
    setMaxStep(exprTree.order + 1);
  }, [exprTree]);

  return (
    <Stack spacing={1}>
      <Paper
        variant="outlined"
        sx={slotProps.graphRegion}
      >
        <TreeGraph
          order={step}
          tree={exprTree}
          symbolTable={symbolTable}
        />
      </Paper>
      <WidgetGraphControl
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
