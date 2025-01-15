import {
  CheckRounded,
  TranslateRounded,
} from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = ["en", "th"];

export const LanguageSwitcher: FC = () => {
  const { i18n, t } = useTranslation();
  const [anchor, setAnchor] =
    useState<HTMLButtonElement | null>(null);

  const handleClose = () => setAnchor(null);
  return (
    <Fragment>
      <Tooltip
        title={<Typography>{t("language")}</Typography>}
      >
        <IconButton
          color="primary"
          size="large"
          onClick={(e) => setAnchor(e.currentTarget)}
        >
          <TranslateRounded />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchor}
        open={anchor !== null}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            sx: {
              borderRadius: ({ shape }) =>
                shape.borderRadius,
            },
          },
        }}
      >
        {LANGUAGES.map((lang, index) => {
          const selected = i18n.language === lang;
          return (
            <MenuItem
              onClick={() => i18n.changeLanguage(lang)}
              disableRipple
              key={"item" + index}
              selected={selected}
              sx={{
                padding: 2,
              }}
            >
              <ListItemIcon>
                {selected && (
                  <CheckRounded color="primary" />
                )}
              </ListItemIcon>
              <ListItemText
                slotProps={{
                  primary: {
                    fontWeight: 500,
                    textTransform: "uppercase",
                  },
                }}
                primary={t(`lang.${lang}`)}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </Fragment>
  );
};
