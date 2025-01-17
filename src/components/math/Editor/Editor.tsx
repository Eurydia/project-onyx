import { Stack, TextField } from "@mui/material";
import { FC, useRef } from "react";
import { EditorRibbon } from "./EditorRibbon";

type EditorProps = {
  placeholder: string;
  name?: string;
};
export const Editor: FC<EditorProps> = (props) => {
  const { name, placeholder } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInsertChar = (char: string) => {
    if (inputRef !== null && inputRef.current !== null) {
      const value = inputRef.current.value;
      inputRef.current.value = `${value} ${char} `;
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
        defaultValue={placeholder}
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
