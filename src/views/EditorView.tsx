import { Editor } from "$components/Editor";
import { Playground } from "$components/Playground";
import { TruthTable } from "$components/TruthTable";
import { parse } from "$core/interpreter/parser";
import i18nInstance from "$locales/config";
import { SyntaxTree } from "$types/ast";
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
import { FC, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

export const EditorView: FC = () => {
  const { t, i18n } = useTranslation("translation", {
    i18n: i18nInstance,
  });

  const [activeTab, setActiveTab] = useState(0);
  const [tree, setTree] = useState<Maybe<
    SyntaxTree,
    string
  > | null>(null);
  // const [operators, setOperators] = useState(
  //   new Map<Operator, boolean>([
  //     [Operator.AND, true],
  //     [Operator.OR, true],
  //     [Operator.IMPL, true],
  //     [Operator.IFF, true],
  //   ])
  // );
  // const [simplifiedTree, setSimplifiedTree] =
  //   useState<Maybe<SyntaxTree, string> | null>(null);

  const handleExecute = (value: string) => {
    if (value.trim().length === 0) {
      setTree(null);
      // setSimplifiedTree(null);
      return;
    }
    const maybeTree = parse(value);
    setTree(maybeTree);
    // if (maybeTree.ok) {
    //   const op = new Set<Operator>();
    //   for (const [k, v] of operators.entries()) {
    //     if (v) {
    //       op.add(k);
    //     }
    //   }
    //   const simplTree = simplifySyntaxTree(
    //     collapseSyntaxTree(
    //       normalizeSyntaxTree(maybeTree.data),
    //       op
    //     )
    //   );
    //   if (simplTree === null) {
    //     setSimplifiedTree({
    //       ok: false,
    //       other:
    //         "Cannot simplified expression to desired form",
    //     });
    //   } else {
    //     setSimplifiedTree({
    //       ok: true,
    //       data: simplTree,
    //     });
    //   }
    // }
  };

  // const handleOperatorChange = (
  //   k: Operator,
  //   v: boolean
  // ) => {
  //   setOperators((p) => {
  //     const next = new Map(p);
  //     next.set(k, v);
  //     return next;
  //   });
  // };

  return (
    <Fragment>
      <Toolbar
        variant="dense"
        disableGutters
        sx={{
          flexDirection: "row",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <ButtonGroup
          variant="text"
          disableElevation
        >
          <Button onClick={() => i18n.changeLanguage("en")}>
            EN
          </Button>
          <Button onClick={() => i18n.changeLanguage("th")}>
            TH
          </Button>
        </ButtonGroup>
        <Button>Solver</Button>
        <Button>Evaluator</Button>
        <Button>Simplify</Button>
        <Button>Tautology Checker</Button>
        <Button>About</Button>
      </Toolbar>
      <Container maxWidth="lg">
        <Stack
          useFlexGap
          spacing={1}
          padding={2}
        >
          <Editor onExecute={handleExecute} />
          <TabContext value={activeTab}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
              }}
            >
              <TabList
                onChange={(_, v) => setActiveTab(v)}
                variant="scrollable"
              >
                <Tab
                  label={t("editor.originalPanel")}
                  value={0}
                />
                <Tab
                  label={t("editor.truthTable")}
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
              <TruthTable maybeTree={tree} />
            </TabPanel>
          </TabContext>
        </Stack>
      </Container>
    </Fragment>
  );
};
