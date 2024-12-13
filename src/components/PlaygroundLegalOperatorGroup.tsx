import { Operator } from "$types/lexer";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
} from "@mui/material";
import { FC } from "react";

const SYMBOL_LABEL = new Map([
  [Operator.AND, "Conjunction"],
  [Operator.OR, "Disjunction"],
  [Operator.IMPLIES, "Implication"],
  [Operator.IFF, "Equivalence"],
]);

type EditorLegalOperatorGroupProp = {
  values: Map<Operator, boolean>;
  onChange: (k: Operator, v: boolean) => void;
};
export const EditorLegalOperatorGroup: FC<
  EditorLegalOperatorGroupProp
> = (props) => {
  const { onChange, values } = props;
  return (
    <FormGroup
      row
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <FormLabel>
        <Typography>Operators:</Typography>
      </FormLabel>
      <FormControlLabel
        disabled
        checked
        control={<Checkbox />}
        label="Negation"
      />
      {[...SYMBOL_LABEL.keys()].map((op, index) => (
        <FormControlLabel
          key={"include-op" + index}
          control={<Checkbox />}
          checked={values.get(op) ?? false}
          label={SYMBOL_LABEL.get(op)}
          onChange={(_, v) => onChange(op, v)}
        />
      ))}
    </FormGroup>
  );
};
