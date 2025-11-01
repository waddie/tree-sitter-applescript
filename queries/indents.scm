; Indent handlers
[
  (simple_handler)
  (positional_handler)
  (labeled_handler)
] @indent.begin

; Indent script objects
(script_statement) @indent.begin

; Indent tell blocks
(tell_statement) @indent.begin

; Indent if statements
(if_statement) @indent.begin

; Indent else/else if clauses separately
(else_if_clause) @indent.branch
(else_clause) @indent.branch

; Indent repeat loops
[
  (repeat_statement)
  (repeat_forever)
  (repeat_times)
  (repeat_while)
  (repeat_until)
  (repeat_with)
  (repeat_with_in)
] @indent.begin

; Indent try blocks
(try_statement) @indent.begin

; Indent considering/ignoring blocks
(considering_statement) @indent.begin
(ignoring_statement) @indent.begin

; Indent timeout blocks
(timeout_statement) @indent.begin

; Indent transaction blocks
(transaction_statement) @indent.begin

; Dedent at 'end' keywords
[
  "end"
  "else"
] @indent.dedent

; Comments don't affect indentation
(comment) @indent.auto
