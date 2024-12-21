import { TextField } from "@mui/material";
import { FC } from "react";

type EditorTextFieldProps = {
  value: string;
  rows: number;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder?: string;
};
export const EditorTextField: FC<EditorTextFieldProps> = (
  props
) => {
  const { placeholder, rows, value, onChange, onKeyDown } =
    props;
  return (
    <TextField
      fullWidth
      multiline
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      slotProps={{
        input: {
          autoComplete: "off",
          autoCorrect: "off",
          autoCapitalize: "none",
          spellCheck: false,
          sx: {
            fontFamily: "monospace",
          },
        },
      }}
    />
  );
};
