import { Editor } from "$components/Editor";
import { Playground } from "$components/Playground";
import { parse } from "$core/interpreter/parser";
import i18nInstance from "$locales/config";
import { Operator, SyntaxTree } from "$types/ast";
import { Maybe } from "$types/common";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Stack,
  Tab,
  Toolbar,
} from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

export const EditorView: FC = () => {
  const { t, i18n } = useTranslation("translation", {
    i18n: i18nInstance,
  });

  const [activeTab, setActiveTab] = useState(0);
  const [operators, setOperators] = useState(
    new Map<Operator, boolean>()
  );
  const [tree, setTree] = useState<
    Maybe<SyntaxTree, string>
  >({
    ok: false,
    other: t("common.emptyText"),
  });

  const handleExecute = (value: string) => {
    if (value.trim().length === 0) {
      setTree({ ok: false, other: t("common.emptyText") });
      return;
    }
    const maybeTree = parse(value);
    setTree(maybeTree);
  };

  const handleOperatorChange = (
    k: Operator,
    v: boolean
  ) => {
    setOperators((p) => {
      const next = new Map(p);
      next.set(k, v);
      return next;
    });
  };

  return (
    <Container maxWidth="lg">
      <Stack
        useFlexGap
        spacing={1}
        padding={2}
      >
        <Toolbar
          variant="dense"
          disableGutters
        >
          <ButtonGroup variant="text">
            <Button
              onClick={() => i18n.changeLanguage("en")}
            >
              EN
            </Button>
            <Button
              onClick={() => i18n.changeLanguage("th")}
            >
              TH
            </Button>
          </ButtonGroup>
        </Toolbar>
        <Editor
          operators={operators}
          onExecute={handleExecute}
          onOperatorChange={handleOperatorChange}
        />
        <TabContext value={activeTab}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <TabList
              onChange={(_, v) => setActiveTab(v)}
              variant="scrollable"
            >
              <Tab
                label="Original"
                value={0}
              />
              <Tab
                label="Simplified"
                value={1}
              />
            </TabList>
          </Box>
          <TabPanel
            keepMounted
            value={0}
            sx={{ padding: 0 }}
          >
            <Playground maybeTree={tree} />
          </TabPanel>
          <TabPanel
            keepMounted
            value={1}
            sx={{ padding: 0 }}
          >
            <Playground maybeTree={tree} />
          </TabPanel>
        </TabContext>
      </Stack>
    </Container>
  );
};
