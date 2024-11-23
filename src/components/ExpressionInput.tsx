import { TextField } from "@mui/material";
import { FC, useRef } from "react";

type ExpressionInputProps = {
  value: string;
  rows: number;
  onChange: (value: string) => void;
  onCursorMove: (position: number | null) => void;
  onExecute: () => void;
};
export const ExpressionInput: FC<ExpressionInputProps> = (
  props
) => {
  const { rows, value, onChange, onCursorMove, onExecute } =
    props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCursorMove = () => {
    if (inputRef.current === null) {
      return;
    }
    onCursorMove(inputRef.current.selectionStart);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === "Enter") {
      onExecute();
    }
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
      onKeyDown={handleKeyDown}
    />
  );
};
