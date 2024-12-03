import {
  exprTreeToSymbolTable,
  syntaxTreetoExprTree,
  syntaxTreeToSymbolTable,
} from "$core/tree/conversion";
import { augmentExprTree } from "$core/tree/expr/augment";
import { ExprTree } from "$types/ast";
import { SymbolTable, SyntaxTree } from "$types/parser";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  FC,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import { EditorBooleanSwitcher } from "./EditorBooleanSwitcherGroup";
import { TreeGraphCluster } from "./TreeGraphCluster";

type TreeGraphProps = {
  tree: SyntaxTree | null;
  emptyText: string;
};
export const TreeGraph: FC<TreeGraphProps> = (props) => {
  const { tree, emptyText } = props;

  const [dialogOpen, setDialogOpen] = useState(false);
  const [symTable, setSymTable] = useState(
    syntaxTreeToSymbolTable(tree)
  );
  const [visibleSymbols, setVisibleSymbols] =
    useState(symTable);

  useEffect(() => {
    setSymTable(syntaxTreeToSymbolTable(tree));
  }, [tree]);

  const ref = useRef<HTMLDivElement>(null);
  const container = ref.current;
  const width =
    container === null
      ? 200
      : container.getBoundingClientRect().width;
  const height =
    container === null
      ? 200
      : container.getBoundingClientRect().height;

  const toggleDialogVisible = () => {
    setDialogOpen((prev) => !prev);
  };

  const handleNodeClick = (exprTree: ExprTree) => {
    const selectedBranch = exprTreeToSymbolTable(exprTree);
    const next: SymbolTable = new Map();
    selectedBranch.forEach((_, k) => {
      const v = symTable.get(k) ?? false;
      next.set(k, v);
    });
    setVisibleSymbols(next);
    setDialogOpen(true);
  };

  const handleSymChange = (k: string, v: boolean) => {
    setSymTable((prev) => {
      const next = new Map(prev);
      next.set(k, v);
      return next;
    });
    setVisibleSymbols((prev) => {
      const next = new Map(prev);
      next.set(k, v);
      return next;
    });
  };

  return (
    <Fragment>
      <Box
        ref={ref}
        sx={{
          height: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {tree === null ? (
          <Typography fontStyle="italic">
            {emptyText}
          </Typography>
        ) : (
          <TreeGraphCluster
            exprTree={augmentExprTree(
              syntaxTreetoExprTree(tree, symTable)
            )}
            width={width}
            onNodeClick={handleNodeClick}
            height={height}
          />
        )}
      </Box>
      <Dialog
        onClose={toggleDialogVisible}
        open={dialogOpen}
      >
        <DialogTitle>แก้ไขค่าความจริง</DialogTitle>
        <DialogContent>
          <EditorBooleanSwitcher
            symTable={visibleSymbols}
            onSymChange={handleSymChange}
          />
        </DialogContent>
        <DialogActions disableSpacing>
          <Button
            onClick={toggleDialogVisible}
            variant="text"
          >
            ปิด
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
