import { Operator } from "$types/lexer";
import { Stack } from "@mui/material";
import { FC, useState } from "react";
import { EditorRibbon } from "./EditorRibbon";
import { EditorTextField } from "./EditorTextField";
import { EditorLegalOperatorGroup } from "./PlaygroundLegalOperatorGroup";

type EditorProps = {
  onExecute: (value: string) => void;
};
export const Editor: FC<EditorProps> = (props) => {
  const { onExecute } = props;

  const [operators, setOperators] = useState(
    new Map<Operator, boolean>()
  );
  const [value, setValue] = useState(
    "not (p and q) iff (not p) or (not q)"
  );

  const handleExecute = () => {
    onExecute(value);
  };

  const handleOperatorChange = (
    k: Operator,
    v: boolean
  ) => {
    setOperators((p) => {
      const next = new Map(p);
      next.set(k, v);
      return next;
    });
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
    <Stack>
      <EditorRibbon
        onExecute={handleExecute}
        onInsertChar={handleInsertChar}
      />
      <EditorTextField
        value={value}
        onChange={setValue}
        onKeyDown={handleKeyDown}
        rows={5}
      />
      <EditorLegalOperatorGroup
        values={operators}
        onChange={handleOperatorChange}
      />
    </Stack>
  );
};
