import { Operator } from "$types/ast";
import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const SYMBOL_LABEL = new Map<Operator, string>([
  [Operator.AND, "conjunction"],
  [Operator.OR, "disjunction"],
  [Operator.IMPL, "implication"],
  [Operator.IFF, "equivalence"],
]);

type EditorSimplConfigGroupProps = {
  values: Map<Operator, boolean>;
  onChange: (k: Operator, v: boolean) => void;
};
export const EditorSimplConfigGroup: FC<
  EditorSimplConfigGroupProps
> = (props) => {
  const { onChange, values } = props;
  const { t } = useTranslation();

  return (
    <Stack
      spacing={1}
      useFlexGap
      direction="row"
      flexWrap="wrap"
      alignItems="center"
    >
      <FormLabel>
        <Typography color="textPrimary">
          {t("editor.allowedOperatorLabel")}:
        </Typography>
      </FormLabel>
      <FormControlLabel
        disabled
        checked
        control={<Checkbox />}
        label={t("common.connectives.negation")}
      />
      {[...SYMBOL_LABEL.entries()].map(([k, l], index) => {
        const checked = values.get(k) ?? false;
        const label = t(`common.connectives.${l}`);

        return (
          <FormControlLabel
            key={"include-op" + index}
            label={label}
            control={<Checkbox />}
            checked={checked}
            onChange={(_, v) => onChange(k, v)}
          />
        );
      })}
    </Stack>
  );
};
