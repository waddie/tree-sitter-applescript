; Rainbow bracket pairs for delimiter matching

; Parentheses (used in function calls, parameter lists, grouping)
[
  "("
  ")"
] @rainbow.bracket

; Braces (used in lists and records)
[
  "{"
  "}"
] @rainbow.bracket

; Handler blocks (on/to...end)
(simple_handler
  "on" @rainbow.keyword.begin
  "end" @rainbow.keyword.end)

(positional_handler
  "on" @rainbow.keyword.begin
  "end" @rainbow.keyword.end)

(labeled_handler
  "to" @rainbow.keyword.begin
  "end" @rainbow.keyword.end)

; Script blocks (script...end)
(script_statement
  "script" @rainbow.keyword.begin
  "end" @rainbow.keyword.end)

; Tell blocks (tell...end)
(tell_statement
  "tell" @rainbow.keyword.begin
  "end" @rainbow.keyword.end)

; If blocks (if...end)
(if_statement
  "if" @rainbow.keyword.begin
  "end" @rainbow.keyword.end)

; Repeat blocks (repeat...end)
(repeat_statement
  "repeat" @rainbow.keyword.begin
  "end" @rainbow.keyword.end)

; Try blocks (try...end)
(try_statement
  "try" @rainbow.keyword.begin
  "end" @rainbow.keyword.end)

; Considering/Ignoring blocks
(considering_statement
  "considering" @rainbow.keyword.begin
  "end" @rainbow.keyword.end)

(ignoring_statement
  "ignoring" @rainbow.keyword.begin
  "end" @rainbow.keyword.end)

; Timeout blocks
(timeout_statement
  "timeout" @rainbow.keyword.begin
  "end" @rainbow.keyword.end)

; Transaction blocks
(transaction_statement
  "transaction" @rainbow.keyword.begin
  "end" @rainbow.keyword.end)
