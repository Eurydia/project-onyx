import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import { type FC, type ReactNode, useState } from "react";

export const ExpressionCard: FC<{
  primary: ReactNode;
  secondary: ReactNode;
}> = (props) => {
  const { primary, secondary } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <Card variant="outlined">
      <CardActionArea onClick={toggleExpanded}>
        <CardContent>{primary}</CardContent>
      </CardActionArea>
      <Collapse in={isExpanded}>{secondary}</Collapse>
    </Card>
  );
};
