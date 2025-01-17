import { Editor } from "$components/math/Editor/Editor";
import { PlayArrowRounded } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { FC } from "react";
import { Form } from "react-router";

export const SolverView: FC = () => {
  return (
    <Box
      maxWidth="lg"
      marginX="auto"
    >
      <Form
        action="/solver/solved"
        method="GET"
      >
        <Stack spacing={1}>
          <Editor
            placeholder="not (p and q) iff (not p or not q)"
            name="content"
          />
          <Button
            disableElevation
            disableRipple
            variant="contained"
            type="submit"
            startIcon={<PlayArrowRounded />}
            sx={{
              maxWidth: "fit-content",
            }}
          >
            RUN
          </Button>
        </Stack>
      </Form>
    </Box>
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

// const [maybeTree, setTree] = useState<Maybe<
//   SyntaxTree,
//   string
// > | null>(null);
// const [symbolTable, setSymbolTable] = useState(
//   new Map<string, boolean>()
// );

// const userManual = useFetchMarkdown(
//   i18n.language === "th" ? userManualTH : userManualEN
// );

// const handleExecute = (value: string) => {
//   if (value.trim().length === 0) {
//     setTree(null);
//     return;
//   }
//   const maybeTree = parse(value);
//   setTree(maybeTree);
// };

// const handleSymbolChange = (k: string, v: boolean) => {
//   setSymbolTable((prev) => {
//     const next = new Map(prev);
//     next.set(k, v);
//     return next;
//   });
// };

// const exprTree = useMemo(() => {
//   if (maybeTree !== null && maybeTree.ok) {
//     return syntaxTreetoExprTree(maybeTree.data);
//   }
//   return null;
// }, [maybeTree]);
// const calcSteps = useMemo(() => {
//   if (exprTree === null) {
//     return [];
//   }
//   return exprTreeFlattenStepByStep(exprTree, symbolTable);
// }, [exprTree, symbolTable]);

// useEffect(() => {
//   if (exprTree === null) {
//     return;
//   }
//   setSymbolTable(() => {
//     const next = new Map<string, boolean>();
//     for (const symbol of exprTreeCollectSymbols(
//       exprTree
//     )) {
//       next.set(symbol, true);
//     }
//     return next;
//   });
// }, [exprTree]);

// let text: ReactNode = (
//   <Typography>
//     {t("view.solver.feedback.noExpression")}
//   </Typography>
// );

// if (maybeTree !== null) {
//   if (maybeTree.ok) {
//     text = (
//       <StyledLatex
//         tex={syntaxTreeToLatex(maybeTree.data)}
//       />
//     );
//   } else {
//     text = <Typography>{maybeTree.other}</Typography>;
//   }
// }
