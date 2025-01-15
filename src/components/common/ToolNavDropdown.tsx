import {
  CheckRounded,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";
import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { FC, Fragment, useState } from "react";
import { NavLink } from "react-router";

type ToolNavDropDownProps = {
  selected: string;
  items: { label: string; href: string }[];
};
export const ToolNavDropDown: FC<ToolNavDropDownProps> = (
  props
) => {
  const { selected, items } = props;
  const [anchor, setAnchor] = useState<null | HTMLElement>(
    null
  );
  const handleOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <Fragment>
      <Button
        disableRipple
        disableElevation
        endIcon={<KeyboardArrowDownRounded />}
        variant="text"
        onClick={handleOpen}
        sx={{
          color: (theme) => theme.palette.text.primary,
        }}
      >
        TOOLS
      </Button>
      <Menu
        anchorEl={anchor}
        open={anchor !== null}
        onClick={handleClose}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              borderRadius: ({ shape }) =>
                shape.borderRadius,
            },
          },
        }}
      >
        {items.map(({ href, label }, index) => {
          const isSelected = selected === href;
          return (
            <MenuItem
              disableRipple
              key={"item" + index}
              component={NavLink}
              to={href}
              selected={isSelected}
              sx={{ padding: 2 }}
            >
              <ListItemIcon>
                {isSelected && <CheckRounded />}
              </ListItemIcon>
              <ListItemText
                slotProps={{
                  primary: {
                    fontWeight: 500,
                    textTransform: "uppercase",
                  },
                }}
              >
                {label}
              </ListItemText>
            </MenuItem>
          );
        })}
      </Menu>
    </Fragment>
  );
};
