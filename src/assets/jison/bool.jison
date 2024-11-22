
%lex
%%

\s+             {/* skip whitespace */}
"and"|"∧"       {return 'T_AND';}
"or"|"∨"        {return 'T_OR';}
"implies"|"→"   {return 'T_IMPL';}
"iff"|"≡"       {return 'T_IFF';}
"not"|"¬"       {return 'T_NOT';}
"("             {return 'T_OPEN_PAREN';}
")"             {return 'T_CLOSE_PAREN';}
\w+             {return 'T_ID';}
<<EOF>>         {return 'EOF';}
.               {return 'INVALID';}

/lex

%left T_IFF
%left T_IMPL
%left T_OR
%left T_AND
%right T_NOT

%start file

%% /* language grammar */


file
  : expr EOF 
    {
      return $1;
    }
  ;

expr
  : T_ID 
    { $$ = true; }
  | expr T_AND expr 
    { $$ = $1 && $3; }
  | expr T_OR expr 
    { $$= $1 || $3; }
  | expr T_IMPL expr 
    { $$ = !$1 || $3; }
  | expr T_IFF expr 
    { $$ = $1 === $3; }
  | T_NOT expr 
    { $$ = !$2; }
  | T_OPEN_PAREN expr T_CLOSE_PAREN
    { $$ = $2; }
  ;