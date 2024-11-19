import {
  Button,
  ButtonGroup,
  Container,
  CssBaseline,
  GlobalStyles,
  Stack,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import createThemeNoVars from "@mui/material/styles/createThemeNoVars";
import { FC, useState } from "react";
const theme = createThemeNoVars({
  typography: {
    fontFamily: "monospace",
  },
});

type BinaryTruthTableProps = {
  repr: string;
  op: (x: boolean, y: boolean) => boolean;
};
const TruthTable: FC<BinaryTruthTableProps> = (props) => {
  const { repr, op } = props;
  const rows = [true, false].map((x, xIndex) =>
    [true, false].map((y, yIndex) => (
      <tr key={`${xIndex}-${yIndex}`}>
        <td>{x ? CHAR_TRUE : CHAR_FALSE}</td>
        <td>{y ? CHAR_TRUE : CHAR_FALSE}</td>
        <td>{op(x, y) ? CHAR_TRUE : CHAR_FALSE}</td>
      </tr>
    ))
  );

  return (
    <table>
      <thead>
        <tr>
          <th>P</th>
          <th>Q</th>
          <th>P {repr} Q</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

type BooleanButtonProps = {
  children: string;
  op: (x: boolean, y: boolean) => boolean;
  onClick: () => void;
};

const BooleanButton: FC<BooleanButtonProps> = (props) => {
  const { children, op, onClick } = props;
  return (
    <Tooltip
      title={
        <Stack
          alignItems="center"
          justifyContent="center"
        >
          <Typography>{children}</Typography>
          <TruthTable
            repr={children}
            op={op}
          />
        </Stack>
      }
    >
      <Button onClick={onClick}>{children}</Button>
    </Tooltip>
  );
};

const CHAR_LAND = "\u{2227}";
const CHAR_TRUE = "\u{22A4}";
const CHAR_FALSE = "\u{22A5}";
const CHAR_LOR = "\u{2228}";
const CHAR_IMPL = "\u{2192}";
const CHAR_IFF = "\u{21d4}";

export const App: FC = () => {
  // const testRef = useRef<HTMLButtonElement | null>(null);
  // useEffect(() => {
  //   if (testRef.current !== null) {
  //     katex.render("\\land", testRef.current);
  //   }
  // }, [testRef]);

  const [text, setText] = useState("");

  const handleTextChange = (next: string) => {
    // let preParsed = next;
    // const lookup: Record<string, string> = {
    //   land: CHAR_LAND,
    //   lor: CHAR_LOR,
    //   impl: CHAR_IMPL,
    //   iff: CHAR_IFF,
    // };

    // for (const [key, value] of Object.entries(lookup)) {
    //   preParsed = preParsed.replace(
    //     new RegExp(key, "g"),
    //     value
    //   );
    // }
    setText(next);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          tableLayout: "auto",
          borderCollapse: "collapse",
        }}
      />
      <Container maxWidth="lg">
        <Stack
          spacing={2}
          useFlexGap
          alignItems="center"
          justifyContent="start"
        >
          <ButtonGroup disableElevation>
            <BooleanButton
              onClick={() =>
                setText((prev) => prev + CHAR_LAND)
              }
              op={(x, y) => x && y}
            >
              {CHAR_LAND}
            </BooleanButton>
            <BooleanButton
              op={(x, y) => x || y}
              onClick={() =>
                setText((prev) => prev + CHAR_LOR)
              }
            >
              {CHAR_LOR}
            </BooleanButton>
            <BooleanButton
              op={(x, y) => (x && !y ? false : true)}
              onClick={() =>
                setText((prev) => prev + CHAR_IMPL)
              }
            >
              {CHAR_IMPL}
            </BooleanButton>
            <BooleanButton
              op={(x, y) => x === y}
              onClick={() =>
                setText((prev) => prev + CHAR_IFF)
              }
            >
              {CHAR_IFF}
            </BooleanButton>
          </ButtonGroup>
          <TextField
            multiline
            rows={10}
            fullWidth
            value={text}
            onChange={(e) =>
              handleTextChange(e.target.value)
            }
          />
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

