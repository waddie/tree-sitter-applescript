; Function/Handler text objects
(simple_handler) @function.around

(positional_handler) @function.around

(labeled_handler) @function.around

; Class-like text objects (script objects in AppleScript)
(script_statement) @class.around

; Parameter text objects
(parameter_list
  (identifier) @parameter.inside)

(direct_parameter
  parameter: (_) @parameter.inside)

(labeled_parameter
  parameter: (_) @parameter.inside)

; Comment text objects
(comment) @comment.inside

(comment)+ @comment.around
