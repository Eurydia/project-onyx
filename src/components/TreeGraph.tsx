import { ExprTree } from "$types/ast";
import { hierarchy } from "@visx/hierarchy";
import { Zoom } from "@visx/zoom";
import { FC } from "react";
import { TreeGraphCluster } from "./TreeGraphCluster";

type TreeGraphProps = {
  tree: ExprTree;
  order: number;
  onNodeClick: (node: ExprTree) => void;
};
export const TreeGraph: FC<TreeGraphProps> = (props) => {
  const { tree, order, onNodeClick } = props;

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
        <TreeGraphCluster
          order={order}
          data={data}
          onNodeClick={onNodeClick}
          zoom={zoom}
        />
      )}
    </Zoom>
  );
};
