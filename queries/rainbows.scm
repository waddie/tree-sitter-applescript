; Rainbow scopes and brackets for delimiter matching

; Handler blocks
[
  (simple_handler)
  (positional_handler)
  (labeled_handler)
] @rainbow.scope

; Script blocks
(script_statement) @rainbow.scope

; Tell blocks
(tell_statement) @rainbow.scope

; If statements
(if_statement) @rainbow.scope

; Repeat loops
[
  (repeat_statement)
  (repeat_times)
  (repeat_while)
  (repeat_until)
  (repeat_with)
  (repeat_with_list)
] @rainbow.scope

; Try blocks
(try_statement) @rainbow.scope

; Considering/Ignoring blocks
(considering_statement) @rainbow.scope
(ignoring_statement) @rainbow.scope

; Timeout blocks
(timeout_statement) @rainbow.scope

; Transaction blocks
(transaction_statement) @rainbow.scope

; Lists and records
(list) @rainbow.scope
(record) @rainbow.scope

; Parameter lists
(parameter_list) @rainbow.scope

; Brackets
[
  "(" ")"
  "{" "}"
] @rainbow.bracket
