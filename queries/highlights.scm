; Keywords
[
  "tell"
  "end"
  "if"
  "then"
  "else"
  "repeat"
  "times"
  "while"
  "until"
  "from"
  "to"
  "by"
  "in"
  "try"
  "on"
  "error"
  "set"
  "copy"
  "return"
  "exit"
  "considering"
  "ignoring"
  "with"
  "timeout"
  "transaction"
  "of"
  "seconds"
  "use"
  "scripting"
  "additions"
  "application"
  "version"
  "script"
  "property"
  "and"
  "or"
  "not"
  "as"
] @keyword

; Control flow
[
  "if"
  "then"
  "else"
  "repeat"
  "exit"
  "return"
] @keyword.control

; Boolean literals
(boolean) @constant.builtin.boolean

; Numbers
(integer) @constant.numeric.integer
(real) @constant.numeric.float

; Strings
(string) @string

; Comments
(comment) @comment

; Identifiers
(identifier) @variable

; Function/Handler definitions
(simple_handler
  name: (identifier) @function)

(positional_handler
  name: (identifier) @function)

(labeled_handler
  name: (identifier) @function)

; Property names
(property_statement
  name: (identifier) @property)

; Record keys
(record_entry
  key: (_) @property)

; Application names
(application_expression
  name: (string) @string.special)

; Operators
[
  "="
  "≠"
  ">"
  "<"
  "≥"
  "≤"
  ">="
  "<="
  "+"
  "-"
  "*"
  "/"
  "÷"
  "^"
  "&"
  "div"
  "mod"
] @operator

; Comparison operators (word-based)
[
  "equals"
  "is equal to"
  "is equal"
  "equal to"
  "is not"
  "is not equal to"
  "is not equal"
  "isn't"
  "isn't equal to"
  "is greater than"
  "greater than"
  "comes after"
  "is less than"
  "less than"
  "comes before"
  "is greater than or equal to"
  "is greater than or equal"
  "is less than or equal to"
  "is less than or equal"
  "contains"
  "contain"
  "does not contain"
  "doesn't contain"
  "is in"
  "is contained by"
  "is not in"
  "is not contained by"
  "starts with"
  "start with"
  "begins with"
  "begin with"
  "ends with"
  "end with"
] @operator

; Delimiters
[
  "("
  ")"
  "{"
  "}"
  ","
  ":"
] @punctuation.delimiter

; Property access
"'s" @punctuation.special
