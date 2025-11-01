; Handler definitions (functions)
(simple_handler
  name: (identifier) @name) @definition.function

(positional_handler
  name: (identifier) @name) @definition.function

(labeled_handler
  name: (identifier) @name) @definition.function

; Script objects (class-like structures)
(script_statement
  name: (identifier) @name) @definition.class

; Property definitions (fields/variables)
(property_statement
  name: (identifier) @name) @definition.property

; Application command calls
(application_command
  command: (identifier) @name) @reference.call

; Method calls (Objective-C bridge)
(method_call
  method: (method_call_label) @name) @reference.call
