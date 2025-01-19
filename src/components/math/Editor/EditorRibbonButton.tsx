import { StyledLatex } from "$components/styled/StyledLatex";
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
        disableElevation
        variant="outlined"
      >
        <Button
          onClick={() => onClick(selected.value)}
          sx={{
            textTransform: "none",
          }}
        >
          <StyledLatex tex={selected.label} />
        </Button>
        <Button
          size="small"
          onClick={() => setOpen(true)}
        >
          {!open && (
            <KeyboardArrowDownRounded fontSize="small" />
          )}
          {open && (
            <KeyboardArrowUpRounded fontSize="small" />
          )}
        </Button>
      </ButtonGroup>
      <Menu
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        onClick={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: ({ shape }) =>
                shape.borderRadius,
            },
          },
        }}
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
              <ListItemText>
                <StyledLatex tex={option.label} />
              </ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </Fragment>
  );
};
