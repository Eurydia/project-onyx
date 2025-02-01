import { StyledOutputCard } from "$components/Styled/StyledOutputCard";
import { VerdictDisplayMany } from "$components/VerdictDisplay";
import { CheckerRouteLoaderData } from "$types/loader-data";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";

type CheckerViewOutputGroupProps = {
  expressions: CheckerRouteLoaderData["expressions"];
};
export const CheckerViewOutputGroup: FC<
  CheckerViewOutputGroupProps
> = (props) => {
  const { expressions } = props;

  const { t } = useTranslation("views", {
    keyPrefix: "checker-view",
  });

  return (
    <Fragment>
      <StyledOutputCard title={t("verdict.title")}>
        <VerdictDisplayMany verdicts={expressions} />
      </StyledOutputCard>
    </Fragment>
  );
};
