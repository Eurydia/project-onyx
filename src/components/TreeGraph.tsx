import { toExprTree } from "$core/ast/expression";
import { SyntaxTree } from "$types/parser";
import { EditRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, Fragment, useRef, useState } from "react";
import { EditorBooleanSwitcher } from "./EditorBooleanSwitcherGroup";
import { TreeGraphCluster } from "./TreeGraphCluster";

type TreeGraphProps = {
  tree: SyntaxTree | null;
  symTable: Record<string, boolean> | null;
  emptyText: string;
  onSymChange: (k: string, v: boolean) => void;
};
export const TreeGraph: FC<TreeGraphProps> = (props) => {
  const { tree, symTable, emptyText, onSymChange } = props;
  const [dialogVisible, setDialogVisible] = useState(
    symTable !== null
  );

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
    setDialogVisible((prev) => !prev);
  };

  // const augmentedExprTree = augmentExprTree(exprTree);

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
        {tree === null || symTable === null ? (
          <Typography fontStyle="italic">
            {emptyText}
          </Typography>
        ) : (
          <TreeGraphCluster
            exprTree={toExprTree(tree, symTable)}
            width={width}
            height={height}
          />
        )}
        <Fab
          sx={{
            position: "absolute",
            bottom: "70px",
            left: "16px",
          }}
          onClick={toggleDialogVisible}
          size="medium"
          color="primary"
        >
          <Tooltip
            placement="right"
            title={
              <Typography>Edit truth values</Typography>
            }
          >
            <EditRounded />
          </Tooltip>
        </Fab>
      </Box>
      <Dialog
        onClose={toggleDialogVisible}
        open={dialogVisible}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Edit truth values</DialogTitle>
        <DialogContent>
          <EditorBooleanSwitcher
            symTable={symTable!}
            onSymChange={onSymChange}
          />
        </DialogContent>
        <DialogActions disableSpacing>
          <Button
            onClick={toggleDialogVisible}
            variant="text"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
