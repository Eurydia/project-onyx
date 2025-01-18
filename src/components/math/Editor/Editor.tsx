import { Stack, TextField } from "@mui/material";
import { Dispatch, FC, useRef } from "react";
import { EditorRibbon } from "./EditorRibbon";

type EditorProps = {
  placeholder: string;
  name?: string;
  value: string;
  onChange: Dispatch<string>;
};
export const Editor: FC<EditorProps> = (props) => {
  const { name, placeholder, value, onChange } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInsertChar = (char: string) => {
    onChange(`${value} ${char} `);
    if (inputRef !== null && inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  return (
    <Stack spacing={1}>
      <EditorRibbon onInsertChar={handleInsertChar} />
      <TextField
        inputRef={inputRef}
        fullWidth
        multiline
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        name={name}
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

// <Stack
// useFlexGap
// alignItems="center"
// width="100%"
// spacing={2}
// direction="row"
// flexWrap="wrap"
// >
// <Button
//   type="submit"
//   disableElevation
//   variant="contained"
//   startIcon={<PlayArrowRounded />}
//   onClick={handleExecute}
// >
//   {t("component.common.editor.run.label")}
// </Button>
// <Typography>
//   {t("component.common.editor.run.alt")}
// </Typography>
// </Stack>
