import { Editor } from "$components/Editor/Editor";
import { InputDisplayMany } from "$components/InputTable";
import { StyledLatex } from "$components/Styled/StyledLatex";
import { StyledOutputCard } from "$components/Styled/StyledOutputCard";
import { TruthTable } from "$components/TruthTable";
import { exprTreeEquals } from "$core/expr-tree/equals";
import { IFF } from "$core/syntax-tree/node";
import { exprTreeFromSyntaxTree } from "$core/tree/conversion";
import { ComparatorRouteLoaderData } from "$types/loader-data";
import { Box, Paper, Stack } from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import { useLoaderData, useSubmit } from "react-router";

export const ComparatorView: FC = () => {
  const { expressions, userInput: prevUserInput } =
    useLoaderData() as ComparatorRouteLoaderData;

  const submit = useSubmit();
  const [userInput, setUserInput] = useState(prevUserInput);

  useEffect(() => {
    setUserInput(prevUserInput);
  }, [prevUserInput]);

  const handleSubmit = () => {
    submit(
      {
        input: userInput,
      },
      {
        method: "GET",
        action: "/comparator",
      }
    );
  };

  const primary = expressions
    .filter((expr) => expr.ok)
    .at(0);

  return (
    <Box
      maxWidth="lg"
      marginX={{ xs: 2, md: "auto" }}
      paddingY={2}
    >
      <Stack spacing={4}>
        <Editor
          value={userInput}
          onChange={setUserInput}
          placeholder="p and q, p or q, p implies q, p iff q"
          onSubmit={handleSubmit}
        />
        {primary !== undefined &&
          prevUserInput.trim().length > 0 && (
            <>
              <StyledOutputCard title="Input Interpretation">
                <InputDisplayMany
                  expressions={expressions}
                />
              </StyledOutputCard>
              <StyledOutputCard title="Comparison">
                <Stack spacing={1}>
                  {expressions
                    .filter((expr) => expr.ok)
                    .slice(1)
                    .map((expr, index) => {
                      if (!expr.ok) {
                        return (
                          <Fragment key={"eval" + index} />
                        );
                      }

                      const curr = exprTreeFromSyntaxTree(
                        expr.tree
                      );

                      const treeEqual = exprTreeEquals(
                        exprTreeFromSyntaxTree(
                          primary.tree
                        ),
                        curr
                      )
                        ? "\\equiv"
                        : "\\not\\equiv";

                      const currLatex =
                        expr.inputInterpretationLatex;
                      const primLatex =
                        primary.inputInterpretationLatex;
                      return (
                        <Paper
                          key={"eval" + index}
                          variant="outlined"
                          sx={{ padding: 4 }}
                        >
                          <StyledLatex>
                            {`$$${currLatex} ${treeEqual} ${primLatex} \\tag{${
                              index + 1
                            }}$$`}
                          </StyledLatex>
                          <TruthTable
                            exprTree={exprTreeFromSyntaxTree(
                              IFF(expr.tree, primary.tree)
                            )}
                            slotProps={{
                              container: {
                                maxHeight: "40vh",
                              },
                            }}
                          />
                        </Paper>
                      );
                    })}
                </Stack>
              </StyledOutputCard>
            </>
          )}
      </Stack>
    </Box>
  );
};
