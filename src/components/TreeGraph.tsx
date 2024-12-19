import { ExprTree, SymbolTable } from "$types/ast";
import { ControlCameraRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";
import {
  TooltipWithBounds,
  useTooltip,
  useTooltipInPortal,
} from "@visx/tooltip";
import { Zoom } from "@visx/zoom";
import { FC, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { StyledFAB } from "./StyledFAB";
import { TreeGraphLink } from "./TreeGraphLink";
import { TreeGraphNode } from "./TreeGraphNode";

type TreeGraphProps = {
  symbolTable: SymbolTable;
  tree: ExprTree;
  order: number;
  onNodeClick: (node: ExprTree) => void;
  onKeyDown: (e: KeyboardEvent<SVGSVGElement>) => void;
};
export const TreeGraph: FC<TreeGraphProps> = (props) => {
  const {
    tree,
    symbolTable,
    order,
    onNodeClick,
    onKeyDown,
  } = props;

  const { t } = useTranslation();
  const data = hierarchy(tree);
  const height = (data.height + 1) * 75;
  const width = (data.leaves().length + 1) * 100;

  const { containerRef } = useTooltipInPortal({
    scroll: true,
    detectBounds: true,
  });

  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
  } = useTooltip<(t: SymbolTable) => boolean>();

  const handleMouseHoverNode = (
    x: number,
    y: number,
    fn: (t: SymbolTable) => boolean
  ) => {
    showTooltip({
      tooltipLeft: x,
      tooltipTop: y,
      tooltipData: fn,
    });
  };

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
            style={{
              touchAction: "none",
            }}
            onKeyDown={onKeyDown}
          >
            <g
              ref={containerRef}
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onTouchEnd={zoom.dragEnd}
              onMouseDown={zoom.dragStart}
              onMouseMove={zoom.dragMove}
              onMouseUp={() => {
                zoom.dragEnd();
                hideTooltip();
              }}
              onMouseLeave={zoom.dragEnd}
              transform={zoom.toString()}
            >
              <Tree
                root={data}
                size={[width, height]}
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
                          onClick={onNodeClick}
                          onMouseEnter={
                            handleMouseHoverNode
                          }
                          onMouseLeave={hideTooltip}
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
          {!zoom.isDragging &&
            tooltipOpen &&
            tooltipData !== undefined &&
            tooltipLeft !== undefined &&
            tooltipTop !== undefined && (
              <TooltipWithBounds
                left={
                  zoom.transformMatrix.scaleX *
                    tooltipLeft +
                  zoom.transformMatrix.translateX
                }
                top={
                  zoom.transformMatrix.scaleY * tooltipTop +
                  zoom.transformMatrix.translateY
                }
              >
                <Typography>
                  {tooltipData(symbolTable)
                    ? t("common.true")
                    : t("common.false")}
                </Typography>
              </TooltipWithBounds>
            )}
        </>
      )}
    </Zoom>
  );
};
