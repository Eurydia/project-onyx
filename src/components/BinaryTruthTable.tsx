import { Typography } from "@mui/material";
import { FC } from "react";
import { Latex } from "./Latex";

type BinaryTruthTableProps = {
  symbol: string;
  operator: (x: boolean, y: boolean) => boolean;
};

export const BinaryTruthTable: FC<BinaryTruthTableProps> = (
  props
) => {
  const { symbol, operator } = props;

  const rows = [true, false].map((x, xIndex) =>
    [true, false].map((y, yIndex) => (
      <tr key={`${xIndex}-${yIndex}`}>
        <td>
          <Typography>{String(x)}</Typography>
        </td>
        <td>
          <Typography>{String(y)}</Typography>
        </td>
        <td>
          <Typography>{String(operator(x, y))}</Typography>
        </td>
      </tr>
    ))
  );

  return (
    <table
      style={{
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th>
            <Latex tex="p" />
          </th>
          <th>
            <Latex tex="q" />
          </th>
          <th>
            <Latex tex={`p ${symbol} q`} />
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
