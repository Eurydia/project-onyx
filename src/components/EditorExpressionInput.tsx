import { TextField } from "@mui/material";
import { FC, useRef } from "react";

type EditorExpressionInputProps = {
  value: string;
  rows: number;
  onChange: (value: string) => void;
  onCursorMove: (position: number | null) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
};
export const EditorExpressionInput: FC<
  EditorExpressionInputProps
> = (props) => {
  const { rows, value, onChange, onCursorMove, onKeyDown } =
    props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCursorMove = () => {
    if (inputRef.current === null) {
      return;
    }
    onCursorMove(inputRef.current.selectionStart);
  };

  return (
    <TextField
      fullWidth
      multiline
      inputRef={inputRef}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onSelect={handleCursorMove}
      onKeyDown={onKeyDown}
      slotProps={{
        input: {
          autoComplete: "off",
          autoCorrect: "off",
          spellCheck: false,
          sx: {
            fontFamily: "monospace",
          },
        },
      }}
    />
  );
};
