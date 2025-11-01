; Function/Handler text objects
; @function.outer includes the entire handler definition
(simple_handler) @function.outer

(positional_handler) @function.outer

(labeled_handler) @function.outer

; @function.inner includes the handler body (statements between 'on'/'to' and 'end')
(simple_handler
  ((_statement) @_start .)
  ((_statement)* @_end .)
  (#make-range! "function.inner" @_start @_end))

(positional_handler
  ((_statement) @_start .)
  ((_statement)* @_end .)
  (#make-range! "function.inner" @_start @_end))

(labeled_handler
  ((_statement) @_start .)
  ((_statement)* @_end .)
  (#make-range! "function.inner" @_start @_end))

; Class-like text objects (script objects in AppleScript)
; @class.outer includes the entire script statement
(script_statement) @class.outer

; @class.inner includes the script body
(script_statement
  name: (_)
  .
  (_)+ @class.inner
  "end")

; Parameter text objects
; @parameter.inner captures individual parameters
(parameter_list
  (identifier) @parameter.inner)

(direct_parameter
  parameter: (_) @parameter.inner)

(labeled_parameter
  parameter: (_) @parameter.inner)

; Block text objects
; Tell blocks
(tell_statement) @block.outer

; If statements
(if_statement) @conditional.outer

(if_statement
  consequence: (_) @conditional.inner)

; Repeat loops
(repeat_statement) @loop.outer

; Try-error blocks
(try_statement) @block.outer

; Comment text objects
(comment) @comment.outer

; Call text objects (for application commands and method calls)
(application_command) @call.outer

(method_call) @call.outer
