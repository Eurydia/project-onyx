import {
  Card,
  CardActionArea,
  CardContent,
  Collapse,
} from "@mui/material";
import { FC, ReactNode, useState } from "react";

type ExpressionCardProps = {
  primary: ReactNode;
  secondary: ReactNode;
};
export const ExpressionCard: FC<ExpressionCardProps> = (
  props
) => {
  const { primary, secondary } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <Card variant="outlined">
      <CardActionArea
        disableRipple
        disableTouchRipple
        onClick={toggleExpanded}
      >
        <CardContent>{primary}</CardContent>
      </CardActionArea>
      <Collapse in={isExpanded}>{secondary}</Collapse>
    </Card>
  );
};
