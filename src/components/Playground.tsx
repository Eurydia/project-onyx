import {
  syntaxTreetoExprTree,
  syntaxTreeToLatex,
} from "$core/tree/conversion";
import { SyntaxTree } from "$types/ast";
import { Maybe } from "$types/common";
import { ExprTree } from "$types/graph";
import { HelpOutlineRounded } from "@mui/icons-material";
import {
  alpha,
  Box,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { LatexDisplay } from "./LatexDisplay";
import { PlaygroundDialog } from "./PlaygroundDialog";
import { PlaygroundPlaybackControl } from "./PlaygroundPlaybackControl";
import { StyledAlert } from "./StyledAlert";
import { TreeGraph } from "./TreeGraph";

type PlaygroundProps = {
  maybeTree: Maybe<SyntaxTree, string> | null;
};
export const Playground: FC<PlaygroundProps> = (props) => {
  const { maybeTree } = props;

  const { t } = useTranslation();
  const { palette, shape } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [symbolTable, setSymbolTable] = useState(
    new Map<string, boolean>()
  );

  const [selectedNode, setSelectedNode] =
    useState<ExprTree | null>(null);
  const [order, setOrder] = useState(0);
  const [maxOrder, setMaxOrder] = useState(0);
  const [exprTree, setExprTree] = useState<ExprTree | null>(
    null
  );

  useEffect(() => {
    if (maybeTree === null || !maybeTree.ok) {
      setOrder(0);
      setMaxOrder(0);
      setExprTree(null);
      return;
    }
    const nextExprTree = syntaxTreetoExprTree(
      maybeTree.data
    );
    setOrder(nextExprTree.order + 1);
    setMaxOrder(nextExprTree.order + 1);
    setExprTree(nextExprTree);
  }, [maybeTree, symbolTable, t]);

  const handleTableChange = (k: string, v: boolean) => {
    if (maybeTree === null || !maybeTree.ok) {
      return;
    }
    setSymbolTable((prev) => {
      const next = new Map(prev);
      next.set(k, v);
      return next;
    });
    // Changing the truth value of the same tree should not cause the playback to reset
    const nextExprTree = syntaxTreetoExprTree(
      maybeTree.data
    );
    setExprTree(nextExprTree);
  };

  const handleNodeClick = (value: ExprTree) => {
    setDialogOpen(true);
    setSelectedNode(value);
  };

  const handleGraphKeyPress = (
    e: KeyboardEvent<SVGSVGElement>
  ) => {
    const { key } = e;
    if (key === "ArrowUp" || key === "ArrowRight") {
      e.preventDefault();
      setOrder((prev) => Math.min(maxOrder, prev + 1));
    } else if (key === "ArrowLeft" || key === "ArrowDown") {
      e.preventDefault();
      setOrder((prev) => Math.max(0, prev - 1));
    }
  };

  let treeGraphText: string | null = null;
  let text: string | null = null;
  if (maybeTree !== null) {
    if (maybeTree.ok) {
      text = syntaxTreeToLatex(maybeTree.data);
    } else {
      text = maybeTree.other.replaceAll(/"(.*)"/g, '``$1"');
      text = `\\textcolor{${palette.error.dark}}{\\text{${text}}}`;
      treeGraphText = t(
        "playground.graph.cannotDisplayEvaluation"
      );
    }
  } else {
    treeGraphText = t(
      "playground.graph.noEvaluationToDisplay"
    );
  }

  return (
    <Stack spacing={1}>
      <LatexDisplay
        text={text}
        error={maybeTree !== null && !maybeTree.ok}
        emptyText={t("playground.feedback.empty")}
      />
      <StyledAlert>
        <Stack
          padding={2}
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
        >
          <HelpOutlineRounded
            fontSize="medium"
            color="info"
          />
          <Typography>
            {t("playground.feedback.dialogInfo")}
          </Typography>
        </Stack>
      </StyledAlert>
      <Box
        ref={containerRef}
        sx={{
          borderWidth: 4,
          borderStyle: "solid",
          borderRadius: shape.borderRadius,
          borderColor: alpha(palette.secondary.main, 0.4),
        }}
      >
        <PlaygroundPlaybackControl
          disabled={exprTree === null}
          maxValue={maxOrder}
          minValue={1}
          value={order}
          onChange={setOrder}
        />
        <Divider flexItem />

        <Box
          position="relative"
          height="75vh"
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          {exprTree !== null ? (
            <TreeGraph
              symbolTable={symbolTable}
              order={order}
              tree={exprTree}
              onNodeClick={handleNodeClick}
              onKeyDown={handleGraphKeyPress}
            />
          ) : (
            <Typography>{treeGraphText}</Typography>
          )}
        </Box>
      </Box>
      {selectedNode !== null && (
        <PlaygroundDialog
          tree={selectedNode}
          open={dialogOpen}
          value={symbolTable}
          onChange={handleTableChange}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </Stack>
  );
};
