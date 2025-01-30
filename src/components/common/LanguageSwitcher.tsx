import { StyledTooltipIconButton } from "$components/Styled/StyledIconButton";
import {
  CheckRounded,
  TranslateRounded,
} from "@mui/icons-material";
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
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
      <StyledTooltipIconButton
        title={t("language")}
        onClick={(e) => setAnchor(e.currentTarget)}
      >
        <TranslateRounded />
      </StyledTooltipIconButton>
      <Menu
        anchorEl={anchor}
        open={anchor !== null}
        onClose={handleClose}
        onClick={handleClose}
      >
        {LANGUAGES.map((lang, index) => {
          const selected = i18n.language === lang;
          return (
            <MenuItem
              key={"item" + index}
              onClick={() => i18n.changeLanguage(lang)}
              disableRipple
              selected={selected}
              sx={{
                padding: 2,
              }}
            >
              <ListItemIcon>
                {selected && <CheckRounded />}
              </ListItemIcon>
              <ListItemText
                slotProps={{
                  primary: {
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
