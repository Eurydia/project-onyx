import { TextField } from "@mui/material";
import { FC, RefObject } from "react";

type EditorTextFieldProps = {
  ref: RefObject<HTMLInputElement>;
  value: string;
  rows: number;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder?: string;
};
export const EditorTextField: FC<EditorTextFieldProps> = (
  props
) => {
  const {
    ref,
    placeholder,
    rows,
    value,
    onChange,
    onKeyDown,
  } = props;

  return (
    <TextField
      ref={ref}
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
