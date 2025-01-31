import { StyledLatex } from "$components/Styled/StyledLatex";
import {
  CheckRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Dispatch,
  FC,
  Fragment,
  useRef,
  useState,
} from "react";

type EditorRibbonButtonProps = {
  options: { label: string; value: string }[];
  onClick: Dispatch<string>;
};
export const EditorRibbonButton: FC<
  EditorRibbonButtonProps
> = (props) => {
  const { options, onClick } = props;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  return (
    <Fragment>
      <ButtonGroup
        ref={anchorRef}
        variant="outlined"
      >
        <Button onClick={() => onClick(selected.value)}>
          <StyledLatex
            sx={{
              textTransform: "none",
              fontFamily: "monospace",
            }}
          >
            {`${selected.label}`}
          </StyledLatex>
        </Button>
        <Button onClick={() => setOpen(true)}>
          {!open && <KeyboardArrowDownRounded />}
          {open && <KeyboardArrowUpRounded />}
        </Button>
      </ButtonGroup>
      <Menu
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        onClick={() => setOpen(false)}
      >
        {options.map((option, index) => {
          const isSelected =
            option.label === selected.label;
          return (
            <MenuItem
              key={"option" + index}
              disableRipple
              selected={isSelected}
              onClick={() => setSelected(option)}
              sx={{ padding: 2 }}
            >
              <ListItemIcon>
                {isSelected && <CheckRounded />}
              </ListItemIcon>
              <ListItemText disableTypography>
                <StyledLatex
                  sx={{ fontFamily: "monospace" }}
                >
                  {`${option.label}`}
                </StyledLatex>
              </ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </Fragment>
  );
};
