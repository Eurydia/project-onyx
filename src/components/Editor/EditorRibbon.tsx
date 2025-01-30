import { Stack } from "@mui/material";
import { FC } from "react";
import { EditorRibbonButton } from "./EditorRibbonButton";

const OPERATOR_TEXT: {
  label: string;
  value: string;
}[] = [
  {
    label: "not",
    value: "not",
  },
  {
    label: "and",
    value: "and",
  },
  {
    label: "or",
    value: "or",
  },
  {
    label: "implies",
    value: "implies",
  },
  {
    label: "iff",
    value: "iff",
  },
];

const OPERATOR_SYMBOL: {
  label: string;
  value: string;
}[] = [
  {
    label: "$\\lnot$",
    value: "\u{00AC}",
  },
  {
    label: "$\\land$",
    value: "\u{2227}",
  },
  {
    label: "$\\lor$",
    value: "\u{2228}",
  },
  {
    label: "$\\implies$",
    value: "\u{21D2}",
  },
  {
    label: "$\\iff$",
    value: "\u{21D4}",
  },
];

type EditorRibbonProps = {
  onClick: (value: string) => void;
};
export const EditorRibbon: FC<EditorRibbonProps> = (
  props
) => {
  const { onClick } = props;
  return (
    <Stack
      useFlexGap
      spacing={2}
      flexWrap="wrap"
      direction="row"
    >
      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={0.5}
        useFlexGap
      >
        {OPERATOR_TEXT.map((option, index) => (
          <EditorRibbonButton
            key={"insert-btn-text" + index}
            onClick={(value) => onClick(value)}
            options={[option, OPERATOR_SYMBOL[index]]}
          />
        ))}
      </Stack>
    </Stack>
  );
};
