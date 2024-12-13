import { ExprTree } from "$types/ast";
import { ControlCameraRounded } from "@mui/icons-material";
import { Group } from "@visx/group";
import { Tree } from "@visx/hierarchy";
import { HierarchyNode } from "@visx/hierarchy/lib/types";
import { ProvidedZoom } from "@visx/zoom/lib/types";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { StyledFAB } from "./StyledFAB";
import { TreeGraphClusterLink } from "./TreeGraphClusterLink";
import { TreeGraphClusterNode } from "./TreeGraphClusterNode";

type TreeGraphClusterProps = {
  data: HierarchyNode<ExprTree>;
  order: number;
  onNodeClick: (node: ExprTree) => void;
  zoom: ProvidedZoom<SVGSVGElement> & {
    isDragging: boolean;
  };
};
export const TreeGraphCluster: FC<TreeGraphClusterProps> = (
  props
) => {
  const { data, order, onNodeClick, zoom } = props;
  const { t } = useTranslation();

  return (
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
          transform={zoom.toString()}
          onMouseLeave={() => {
            if (zoom.isDragging) zoom.dragEnd();
          }}
        >
          <Tree root={data}>
            {(treeHeir) => (
              <Group>
                {treeHeir.links().map((link, i) => (
                  <TreeGraphClusterLink
                    key={`cluster-link-${i}`}
                    order={order}
                    link={link}
                  />
                ))}
                {treeHeir.descendants().map((node, i) => (
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
  );
};
