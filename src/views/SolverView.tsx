import {
  default as userManualEN,
  default as userManualTH,
} from "$assets/manual/solver-manual/en.txt";
import { Editor } from "$components/math/Editor/Editor";
import { StyledLatex } from "$components/styled/StyledLatex";
import { exprTreeFlattenStepByStep } from "$core/exprTreeFlattenStepByStep";
import { parse } from "$core/interpreter/parser";
import {
  syntaxTreetoExprTree,
  syntaxTreeToLatex,
} from "$core/tree/conversion";
import { exprTreeCollectSymbols } from "$core/tree/expr/evaluate";
import { useFetchMarkdown } from "$hooks/useFetchMarkdown";
import { SyntaxTree } from "$types/ast";
import { Maybe } from "$types/common";
import { Stack, Typography } from "@mui/material";
import {
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

export const SolverView: FC = () => {
  const { t, i18n } = useTranslation("translation");
  const [userInput, setUserInput] = useState("");
  const [maybeTree, setTree] = useState<Maybe<
    SyntaxTree,
    string
  > | null>(null);
  const [symbolTable, setSymbolTable] = useState(
    new Map<string, boolean>()
  );

  const userManual = useFetchMarkdown(
    i18n.language === "th" ? userManualTH : userManualEN
  );

  const handleExecute = (value: string) => {
    if (value.trim().length === 0) {
      setTree(null);
      return;
    }
    const maybeTree = parse(value);
    setTree(maybeTree);
  };

  const handleSymbolChange = (k: string, v: boolean) => {
    setSymbolTable((prev) => {
      const next = new Map(prev);
      next.set(k, v);
      return next;
    });
  };

  const exprTree = useMemo(() => {
    if (maybeTree !== null && maybeTree.ok) {
      return syntaxTreetoExprTree(maybeTree.data);
    }
    return null;
  }, [maybeTree]);
  const calcSteps = useMemo(() => {
    if (exprTree === null) {
      return [];
    }
    return exprTreeFlattenStepByStep(exprTree, symbolTable);
  }, [exprTree, symbolTable]);

  useEffect(() => {
    if (exprTree === null) {
      return;
    }
    setSymbolTable(() => {
      const next = new Map<string, boolean>();
      for (const symbol of exprTreeCollectSymbols(
        exprTree
      )) {
        next.set(symbol, true);
      }
      return next;
    });
  }, [exprTree]);

  let text: ReactNode = (
    <Typography>
      {t("view.solver.feedback.noExpression")}
    </Typography>
  );

  if (maybeTree !== null) {
    if (maybeTree.ok) {
      text = (
        <StyledLatex
          tex={syntaxTreeToLatex(maybeTree.data)}
        />
      );
    } else {
      text = <Typography>{maybeTree.other}</Typography>;
    }
  }

  return (
    <Stack
      useFlexGap
      spacing={1}
      maxWidth="lg"
      marginX="auto"
    >
      <Editor
        value={userInput}
        placeholder="not (p and q) iff (not p or not q)"
        onChange={setUserInput}
      />
    </Stack>
  );
};

// <Paper
//   variant="outlined"
//   sx={{
//     padding: 4,
//     display: "flex",
//     flexDirection: "column",
//     gap: 1,
//   }}
// >
//   <Typography
//     fontWeight="bold"
//     variant="h6"
//     component="span"
//   >
//     Input
//   </Typography>
//   {text}
// </Paper>;
// {exprTree !== null && (
//   <>
//     <Paper
//       variant="outlined"
//       sx={{
//         padding: 4,
//       }}
//     >
//       <Typography
//         fontWeight="bold"
//         variant="h6"
//         component="div"
//       >
//         Output
//       </Typography>
//       <StyledLatex
//         options={{
//           displayMode: true,
//         }}
//         tex={`\\text{${
//           exprTree.eval(symbolTable)
//             ? "True"
//             : "False"
//         }}`}
//       />
//       <Divider flexItem />
//       <PlaygroundSymbolConfig
//         symbolTable={symbolTable}
//         onChange={handleSymbolChange}
//       />
//     </Paper>
//     <Paper
//       variant="outlined"
//       sx={{ padding: 4 }}
//     >
//       <Typography
//         fontWeight="bold"
//         component="div"
//         variant="h6"
//       >
//         Step-by-step
//       </Typography>
//       <Stack
//         spacing={1}
//         divider={<Divider />}
//       >
//         {calcSteps.map((step, index) => (
//           <Box key={"step" + index}>
//             <Typography fontWeight="bold">
//               Step {index + 1}
//             </Typography>
//             <StyledLatex
//               tex={step.expr}
//               options={{ displayMode: true }}
//             />
//             {step.subSteps.length >= 1 && (
//               <>
//                 <Typography>
//                   Substitute into expression
//                 </Typography>
//                 <ul>
//                   {step.subSteps.map(
//                     (subStep, index) => (
//                       <li key={"substep" + index}>
//                         <Typography
//                           sx={{
//                             display: "flex",
//                             flexDirection: "row",
//                             gap: 1,
//                           }}
//                         >
//                           From step {subStep + 1}:
//                           <StyledLatex
//                             tex={`${calcSteps[subStep].expr}\\equiv${calcSteps[subStep].evaluated}`}
//                           />
//                         </Typography>
//                       </li>
//                     )
//                   )}
//                 </ul>
//               </>
//             )}
//             <StyledLatex
//               tex={`\\begin{align*}${step.expr}&\\equiv${step.substituted}\\\\ &\\equiv${step.evaluated}.\\end{align*}`}
//               options={{
//                 displayMode: true,
//                 leqno: false,
//                 fleqn: false,
//               }}
//             />
//           </Box>
//         ))}
//       </Stack>
//     </Paper>
//     <Paper
//       variant="outlined"
//       sx={{
//         padding: 4,
//       }}
//     >
//       <Typography
//         fontWeight="bold"
//         variant="h6"
//         component="div"
//       >
//         Graph
//       </Typography>
//       <StyledAlert severity="info">
//         <Typography>
//           Use re-center button in case you cannot find
//           the graph
//         </Typography>
//       </StyledAlert>
//       <Playground
//         exprTree={exprTree}
//         symbolTable={symbolTable}
//       />
//     </Paper>
//     <Paper
//       variant="outlined"
//       sx={{
//         padding: 4,
//       }}
//     >
//       <Typography
//         fontWeight="bold"
//         variant="h6"
//         component="div"
//       >
//         Truth table
//       </Typography>
//       <TruthTable exprTree={exprTree} />
//     </Paper>
//   </>
// )}
