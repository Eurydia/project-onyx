import {
  SymbolTable,
  SyntaxTreeNodeKind,
} from "$types/ast";
import { ExprTree } from "$types/graph";
import { ControlCameraRounded } from "@mui/icons-material";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";
import { Zoom } from "@visx/zoom";
import { FC, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { StyledFAB } from "./StyledFAB";
import { TreeGraphLink } from "./TreeGraphLink";
import { TreeGraphNode } from "./TreeGraphNode";

const flatten_expr = (d: ExprTree) => {
  switch (d.nodeType) {
    case SyntaxTreeNodeKind.CONST:
      return null;
    case SyntaxTreeNodeKind.IDEN:
      return null;
    case SyntaxTreeNodeKind.UNARY:
      return [d.child];
    case SyntaxTreeNodeKind.BINARY:
      return [d.left, d.right];
  }
};

type TreeGraphProps = {
  symbolTable: SymbolTable;
  tree: ExprTree;
  order: number;
  onKeyDown: (e: KeyboardEvent<SVGSVGElement>) => void;
};
export const TreeGraph: FC<TreeGraphProps> = (props) => {
  const { tree, symbolTable, order, onKeyDown } = props;

  const { t } = useTranslation();
  const data = hierarchy(tree, flatten_expr);
  const height = (data.height + 1) * 100;
  const width = (data.leaves().length + 1) * 150;

  return (
    <Zoom<SVGSVGElement>
      width={width}
      height={height}
      scaleXMin={1 / 3}
      scaleXMax={4}
      scaleYMin={1 / 3}
      scaleYMax={4}
    >
      {(zoom) => (
        <>
          <svg
            tabIndex={0} // Need tabindex otherwise svg will not send keyboard event
            width="100%"
            height="100%"
            ref={zoom.containerRef}
            onKeyDown={onKeyDown}
            style={{
              touchAction: "none",
            }}
          >
            <g
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onTouchEnd={zoom.dragEnd}
              onMouseDown={zoom.dragStart}
              onMouseMove={zoom.dragMove}
              onMouseUp={zoom.dragEnd}
              onMouseLeave={zoom.dragEnd}
              transform={zoom.toString()}
            >
              <Tree
                root={data}
                size={[width, -height]}
              >
                {(treeHeir) => (
                  <Group>
                    {treeHeir.links().map((link, i) => (
                      <TreeGraphLink
                        key={`link-${i}`}
                        order={order}
                        link={link}
                      />
                    ))}
                    {treeHeir
                      .descendants()
                      .map((node, i) => (
                        <TreeGraphNode
                          key={`node-${i}`}
                          order={order}
                          node={node}
                          symbolTable={symbolTable}
                        />
                      ))}
                  </Group>
                )}
              </Tree>
            </g>
          </svg>
          <StyledFAB
            onClick={zoom.center}
            title={t("playground.graph.center")}
          >
            <ControlCameraRounded />
          </StyledFAB>
        </>
      )}
    </Zoom>
  );
};
