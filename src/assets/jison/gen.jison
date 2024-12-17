/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

"("                     return 'T_LPAREN'
")"                     return 'T_RPAREN'
"ถ้า"                   return 'T_IF';
"แล้ว"                   return 'T_THEN';
"¬"                     return 'T_NOT';
"not"                   return 'T_NOT';
"∧"                     return 'T_AND';
"และ"                   return 'T_AND';
"and"                   return 'T_AND';
"∨"                     return "T_OR";
"หรือ"                   return 'T_OR';
"or"                    return 'T_OR';
"⇒"                     return "T_IMPLIES";
"implies"               return 'T_IMPLIES';
"ก็ต่อเมื่อ"                 return 'T_IFF';
"⇔"                    return "T_IFF"
"iff"                   return 'T_IFF';
[a-zA-Z\u0E00-\u0E7F]+  return 'T_ID';
<<EOF>>                 return 'EOF';
\s+                     /* skip whitespace */
.                       return 'INVALID';

/lex

/* operator associations and precedence */

%token T_LPAREN
%token T_RPAREN
%token T_ID
%token INVALID

%left 'T_AND'
%left 'T_OR'
%left 'T_IMPLIES' "T_THEN"
%left 'T_IFF'
%nonassoc "T_IF"
%nonassoc 'T_NOT'


%start s

%% /* language grammar */

s: 
    expr EOF
    { 
        return $1; 
    }
;


expr:
    T_ID
    {
        $$ = {nodeType: "id", symbol: yytext};
    }
|
    T_NOT expr
    {
        $$ = {nodeType: "unary", child: $2};
    }
|
    expr T_AND expr
    {
        $$ = {nodeType: "binary", op: "and",left: $1, right: $3};
    }
|
    expr T_OR expr
    {
        $$ = {nodeType: "binary", op: "or",left: $1, right: $3};
    }
|
    expr T_IMPLIES expr
    {
        $$ = {nodeType: "binary", op: "implies",left: $1, right: $3};
    }
|
    expr T_IFF expr
    {
        $$ = {nodeType: "binary", op: "iff",left: $1, right: $3};
    }
|
    T_LPAREN expr T_RPAREN 
    {
        $$ = $2;
    }
|   
    T_IF expr T_THEN expr
    {
        $$ = {nodeType: "binary", op: "implies",left: $2, right: $4};
    }
;