import { Editor } from "$components/Editor/Editor";
import { InputDisplayMany } from "$components/InputTable";
import { CheckerViewOutputGroup } from "$components/math/CheckerViewOutputGroup";
import { StyledOutputCard } from "$components/Styled/StyledOutputCard";
import { CheckerRouteLoaderData } from "$types/loader-data";
import { Box, Divider, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useLoaderData, useSubmit } from "react-router";

export const CheckerView: FC = () => {
  const loaderData =
    useLoaderData() as CheckerRouteLoaderData;
  const { expressions, userInput: prevUserInput } =
    loaderData;

  const submit = useSubmit();

  const [userInput, setUserInput] = useState(prevUserInput);

  useEffect(() => {
    setUserInput(userInput);
  }, [userInput]);

  const handleSubmit = () => {
    submit(
      {
        input: userInput,
      },
      {
        method: "GET",
        action: "/checker",
      }
    );
  };

  return (
    <>
      <Box
        maxWidth="lg"
        marginX={{ xs: 2, md: "auto" }}
        paddingY={2}
      >
        <Stack spacing={1}>
          <Editor
            value={userInput}
            placeholder="not (p and q) iff (not p or not q)"
            onChange={setUserInput}
            onSubmit={handleSubmit}
          />
          {prevUserInput.trim().length > 0 && (
            <>
              <StyledOutputCard title="Input Interpretation">
                <InputDisplayMany
                  expressions={expressions}
                />
              </StyledOutputCard>
              <Divider flexItem />
              <CheckerViewOutputGroup
                expressions={expressions}
              />
            </>
          )}
        </Stack>
      </Box>
    </>
  );
};
