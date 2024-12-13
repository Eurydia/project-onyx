import { ExprTree } from "$types/ast";
import { ControlCameraRounded } from "@mui/icons-material";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";
import { Zoom } from "@visx/zoom";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { StyledFAB } from "./StyledFAB";
import { TreeGraphClusterLink } from "./TreeGraphClusterLink";
import { TreeGraphClusterNode } from "./TreeGraphClusterNode";

type TreeGraphClusterProps = {
  tree: ExprTree;
  order: number;
  onNodeClick: (node: ExprTree) => void;
};
export const TreeGraphCluster: FC<TreeGraphClusterProps> = (
  props
) => {
  const { tree, order, onNodeClick } = props;
  const { t } = useTranslation();

  const data = hierarchy(tree);
  const height = (data.height + 1) * 75;
  const width = (data.leaves().length + 1) * 100;

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
        <Fragment>
          <svg
            width="100%"
            height="100%"
            ref={zoom.containerRef}
            style={{ touchAction: "none" }}
          >
            <g
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onMouseDown={zoom.dragStart}
              onTouchEnd={zoom.dragEnd}
              onMouseMove={zoom.dragMove}
              onMouseUp={zoom.dragEnd}
              onMouseLeave={() => {
                if (zoom.isDragging) zoom.dragEnd();
              }}
              transform={zoom.toString()}
            >
              <Tree
                root={data}
                size={[width, height]}
              >
                {(treeHeir) => (
                  <Group>
                    {treeHeir.links().map((link, i) => (
                      <TreeGraphClusterLink
                        key={`cluster-link-${i}`}
                        order={order}
                        link={link}
                      />
                    ))}
                    {treeHeir
                      .descendants()
                      .map((node, i) => (
                        <TreeGraphClusterNode
                          key={`cluster-node-${i}`}
                          order={order}
                          node={node}
                          onClick={onNodeClick}
                        />
                      ))}
                  </Group>
                )}
              </Tree>
            </g>
          </svg>
          <StyledFAB
            onClick={zoom.center}
            title={t("graph.center")}
          >
            <ControlCameraRounded />
          </StyledFAB>
        </Fragment>
      )}
    </Zoom>
  );
};
