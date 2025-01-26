import { Stack, TextField } from "@mui/material";
import { Dispatch, FC, memo, useRef } from "react";
import { EditorRibbon } from "./EditorRibbon";

type EditorProps = {
  placeholder: string;
  value: string;
  onChange: Dispatch<string>;
};
const Editor_: FC<EditorProps> = (props) => {
  const { placeholder, value, onChange } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInsertChar = (char: string) => {
    onChange(`${value} ${char} `);
    if (inputRef !== null && inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  return (
    <Stack spacing={1}>
      <EditorRibbon onClick={handleInsertChar} />
      <TextField
        inputRef={inputRef}
        fullWidth
        multiline
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        slotProps={{
          input: {
            sx: {
              fontFamily: "monospace",
            },
          },
          htmlInput: {
            autoCapitalize: "off",
            spellCheck: "false",
          },
        }}
      />
    </Stack>
  );
};
export const Editor = memo(
  Editor_,
  (prev, next) => prev.value === next.value
);
