import { Typography } from "@mui/material";
import { FC } from "react";
import { StyledLatex } from "./StyledLatex";

type UnaryTruthTableProps = {
  symbol: string;
  operator: (x: boolean) => boolean;
};

export const UnaryTruthTable: FC<UnaryTruthTableProps> = (
  props
) => {
  const { symbol, operator } = props;

  const rows = [true, false].map((x, index) => (
    <tr key={"row" + index}>
      <td>
        <Typography>{String(x)}</Typography>
      </td>
      <td>
        <Typography>{String(operator(x))}</Typography>
      </td>
    </tr>
  ));

  return (
    <table
      style={{
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          <th>
            <StyledLatex tex="p" />
          </th>
          <th>
            <StyledLatex tex={`${symbol} p`} />
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
