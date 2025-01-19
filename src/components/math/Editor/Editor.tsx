import { Stack, TextField } from "@mui/material";
import { Dispatch, FC, useRef } from "react";
import { EditorRibbon } from "./EditorRibbon";

type EditorProps = {
  placeholder: string;
  value: string;
  onChange: Dispatch<string>;
};
export const Editor: FC<EditorProps> = (props) => {
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
            autoCapitalize: "off",
            spellCheck: "false",
            sx: {
              fontFamily: "monospace",
            },
          },
        }}
      />
    </Stack>
  );
};
