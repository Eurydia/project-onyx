import { Stack, TextField } from "@mui/material";
import { FC, useRef } from "react";
import { EditorRibbon } from "./EditorRibbon";

type EditorProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};
export const Editor: FC<EditorProps> = (props) => {
  const { onChange, placeholder, value } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInsertChar = (char: string) => {
    const next = `${value} ${char} `;
    onChange(next);
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
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
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
