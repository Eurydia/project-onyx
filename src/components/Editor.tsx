import { Stack } from "@mui/material";
import { FC, useState } from "react";
import { EditorRibbon } from "./EditorRibbon";
import { EditorTextField } from "./EditorTextField";

type EditorProps = {
  // operators: Map<Operator, boolean>;
  onExecute: (value: string) => void;
  // onOperatorChange: (k: Operator, v: boolean) => void;
};
export const Editor: FC<EditorProps> = (props) => {
  const {
    onExecute,
    // onOperatorChange,
    // operators,
  } = props;

  const [value, setValue] = useState(
    "not (p and q) iff (not p) or (not q)"
  );

  const handleExecute = () => {
    onExecute(value);
  };

  const handleInsertChar = (char: string) => {
    setValue((prev) => `${prev} ${char}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleExecute();
    }
  };

  return (
    <Stack spacing={1}>
      <EditorRibbon
        onExecute={handleExecute}
        onInsertChar={handleInsertChar}
      />
      <EditorTextField
        placeholder="ex. not (p and q) iff (not p) or (not q)"
        value={value}
        onChange={setValue}
        onKeyDown={handleKeyDown}
        rows={5}
      />
      {/* <EditorSimplConfigGroup
        values={operators}
        onChange={onOperatorChange}
      /> */}
    </Stack>
  );
};
