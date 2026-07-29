import CheckRounded from "@mui/icons-material/CheckRounded";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import { type FC, Fragment, useRef, useState } from "react";
import { StyledLatex } from "$/components/styled/StyledLatex";

export const EditorRibbonButton: FC<{
  options: { label: string; value: string }[];
  onClick: (value: string) => void;
}> = (props) => {
  const { options, onClick } = props;
  const { palette } = useTheme();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  return (
    <Fragment>
      <ButtonGroup
        ref={anchorRef}
        variant="contained"
        color="primary"
      >
        <Button
          onClick={() => onClick(selected.value)}
          sx={{
            "&:hover": {
              color: palette.getContrastText(palette.primary.main),
              backgroundColor: palette.primary.main,
            },
            color: palette.primary.dark,
            backgroundColor: palette.primary.light,
          }}
        >
          <StyledLatex
            sx={{
              textTransform: "none",
              fontFamily: "monospace",
            }}
          >
            {selected.label}
          </StyledLatex>
        </Button>
        <Button
          onClick={() => setOpen(true)}
          sx={{
            "&:hover": {
              color: palette.getContrastText(palette.primary.main),
              backgroundColor: palette.primary.main,
            },
            color: palette.primary.dark,
            backgroundColor: palette.primary.light,
          }}
        >
          <KeyboardArrowDownRounded
            sx={{
              transition: "transform 0.2s ease",
              transform: open
                ? "rotate(180deg)"
                : "rotate(0deg)",
            }}
          />
        </Button>
      </ButtonGroup>
      <Menu
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        onClick={() => setOpen(false)}
      >
        {options.map((option, index) => {
          const isSelected = option.label === selected.label;

          return (
            <MenuItem
              key={`option${index}`}
              selected={isSelected}
              onClick={() => setSelected(option)}
              sx={{ padding: 2 }}
            >
              <ListItemIcon>
                {isSelected && <CheckRounded />}
              </ListItemIcon>
              <ListItemText disableTypography>
                <StyledLatex sx={{ fontFamily: "monospace" }}>
                  {option.label}
                </StyledLatex>
              </ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </Fragment>
  );
};
