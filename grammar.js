module.exports = grammar({
  name: 'applescript',

  extras: $ => [
    $.comment,
    /[\s\f\uFEFF\u2060\u200B]|\\\r?\n/,
  ],

  conflicts: $ => [
    [$.repeat_times, $.expression_statement],
    [$.repeat_until, $.expression_statement],
    [$.repeat_while, $.expression_statement],
    [$.repeat_with, $.expression_statement],
    [$.repeat_with_in, $.expression_statement],
    [$.transaction_statement, $.expression_statement],
    [$.application_command, $.expression_statement],
    [$.application_command, $.command_parameter],
    [$.application_command],
    [$.application_command, $.expression],
    [$.application_command, $.property_name, $.expression],
    [$.list, $.record],
    [$.simple_handler, $.positional_handler],
    [$.positional_handler, $.labeled_handler],
    [$.direct_parameter, $.labeled_parameter, $.expression],
    [$.direct_parameter, $.application_command, $.expression],
    [$.direct_parameter, $.labeled_parameter, $.application_command, $.property_name, $.expression],
    [$.direct_parameter, $.application_command, $.property_name, $.expression],
    [$.labeled_parameter, $.application_command, $.property_name, $.expression],
    [$.command_parameter, $.expression],
    [$.command_parameter, $.property_name, $.expression],
    [$.parameter_list, $.expression],
    [$.script_statement],
    [$.if_statement],
    [$.if_statement, $.else_if_clause],
    [$.on_error_clause, $.expression],
    [$.property_name, $.expression],
    [$.property_name],
  ],

  rules: {
    source_file: $ => repeat(choice(
      $.property_statement,
      $.handler_definition,
      $._statement,
    )),

    _statement: $ => choice(
      $.tell_statement,
      $.if_statement,
      $.repeat_statement,
      $.try_statement,
      $.set_statement,
      $.return_statement,
      $.exit_statement,
      $.error_statement,
      $.considering_statement,
      $.ignoring_statement,
      $.timeout_statement,
      $.transaction_statement,
      $.use_statement,
      $.script_statement,
      $.application_command,
      $.expression_statement,
    ),

    // Comments
    comment: $ => choice(
      seq('--', /.*/),
      seq('#', /.*/),
      seq('(*', repeat(choice(/[^*]/, /\*[^)]/)), '*)'),
    ),

    // Tell Statement
    tell_statement: $ => prec.right(choice(
      seq(
        'tell',
        field('target', $.expression),
        'to',
        field('statement', $._statement),
      ),
      seq(
        'tell',
        field('target', $.expression),
        repeat1($._statement),
        'end',
        optional('tell'),
      ),
      seq(
        'tell',
        field('target', $.expression),
      ),
    )),

    // If Statement
    if_statement: $ => seq(
      'if',
      field('condition', $.expression),
      'then',
      choice(
        $._statement,
        seq(
          repeat1($._statement),
          repeat($.else_if_clause),
          optional($.else_clause),
          'end',
          optional('if'),
        ),
      ),
    ),

    else_if_clause: $ => seq(
      'else',
      'if',
      field('condition', $.expression),
      'then',
      repeat1($._statement),
    ),

    else_clause: $ => seq(
      'else',
      repeat1($._statement),
    ),

    // Repeat Statement
    repeat_statement: $ => choice(
      $.repeat_forever,
      $.repeat_times,
      $.repeat_until,
      $.repeat_while,
      $.repeat_with,
      $.repeat_with_in,
    ),

    repeat_forever: $ => prec.right(seq(
      'repeat',
      repeat1($._statement),
      'end',
      optional('repeat'),
    )),

    repeat_times: $ => prec.right(seq(
      'repeat',
      field('count', $.expression),
      optional('times'),
      repeat1($._statement),
      'end',
      optional('repeat'),
    )),

    repeat_until: $ => prec.right(seq(
      'repeat',
      'until',
      field('condition', $.expression),
      repeat1($._statement),
      'end',
      optional('repeat'),
    )),

    repeat_while: $ => prec.right(seq(
      'repeat',
      'while',
      field('condition', $.expression),
      repeat1($._statement),
      'end',
      optional('repeat'),
    )),

    repeat_with: $ => prec.right(seq(
      'repeat',
      'with',
      field('variable', $.identifier),
      'from',
      field('start', $.expression),
      'to',
      field('end', $.expression),
      optional(seq('by', field('step', $.expression))),
      repeat1($._statement),
      'end',
      optional('repeat'),
    )),

    repeat_with_in: $ => prec.right(seq(
      'repeat',
      'with',
      field('variable', $.identifier),
      'in',
      field('list', $.expression),
      repeat1($._statement),
      'end',
      optional('repeat'),
    )),

    // Try Statement
    try_statement: $ => prec.right(seq(
      'try',
      repeat1($._statement),
      repeat($.on_error_clause),
      'end',
      optional('try'),
    )),

    on_error_clause: $ => seq(
      'on',
      'error',
      optional(field('message_var', $.identifier)),
      optional(seq('number', field('number_var', $.identifier))),
      optional(seq('from', field('from_var', $.identifier))),
      optional(seq('partial', 'result', field('partial_var', $.identifier))),
      optional(seq('to', field('to_var', $.identifier))),
      repeat1($._statement),
    ),

    // Set Statement
    set_statement: $ => seq(
      choice('set', 'copy'),
      field('target', $.expression),
      'to',
      field('value', $.expression),
    ),

    // Return Statement
    return_statement: $ => prec.right(seq(
      'return',
      optional(field('value', $.expression)),
    )),

    // Exit Statement
    exit_statement: $ => prec.right(seq(
      'exit',
      optional('repeat'),
    )),

    // Error Statement
    error_statement: $ => prec.right(seq(
      'error',
      optional(choice(
        seq(field('message', $.expression), repeat($.error_clause)),
        repeat1($.error_clause),
      )),
    )),

    error_clause: $ => choice(
      seq('number', field('number', $.expression)),
      seq('from', field('from', $.expression)),
      seq('partial', 'result', field('partial', $.expression)),
      seq('to', field('to', $.expression)),
    ),

    // Considering/Ignoring Statements
    considering_statement: $ => prec.right(seq(
      'considering',
      $.considering_terms,
      repeat1($._statement),
      'end',
      optional('considering'),
    )),

    ignoring_statement: $ => prec.right(seq(
      'ignoring',
      $.considering_terms,
      repeat1($._statement),
      'end',
      optional('ignoring'),
    )),

    considering_terms: $ => seq(
      $.considering_term,
      repeat(seq(optional(','), optional('and'), $.considering_term)),
    ),

    considering_term: $ => choice(
      'case',
      'diacriticals',
      'expansion',
      'hyphens',
      'punctuation',
      'white space',
      'numeric strings',
    ),

    // Timeout Statement
    timeout_statement: $ => seq(
      'with',
      'timeout',
      optional('of'),
      field('duration', $.expression),
      optional('seconds'),
      repeat1($._statement),
      'end',
      optional('timeout'),
    ),

    // Transaction Statement
    transaction_statement: $ => seq(
      'with',
      'transaction',
      optional(seq(optional('of'), field('session', $.expression))),
      repeat1($._statement),
      'end',
      optional('transaction'),
    ),

    // Use Statement
    use_statement: $ => seq(
      'use',
      choice(
        seq('scripting', 'additions'),
        seq(
          optional('application'),
          field('name', $.string),
          optional(seq('version', field('version', $.string))),
        ),
      ),
    ),

    // Script Statement
    script_statement: $ => prec.right(seq(
      'script',
      field('name', $.identifier),
      repeat(choice(
        $.property_statement,
        $.handler_definition,
        $._statement,
      )),
      'end',
      optional('script'),
    )),

    // Property Statement
    property_statement: $ => seq(
      'property',
      field('name', $.identifier),
      ':',
      field('value', $.expression),
    ),

    // Handler Definition
    handler_definition: $ => choice(
      $.simple_handler,
      $.positional_handler,
      $.labeled_handler,
    ),

    simple_handler: $ => prec.right(10, seq(
      'on',
      field('name', $.identifier),
      '(',
      optional($.parameter_list),
      ')',
      repeat1($._statement),
      'end',
      optional(field('end_name', $.identifier)),
    )),

    positional_handler: $ => prec.right(10, seq(
      'on',
      field('name', $.identifier),
      optional($.direct_parameter),
      repeat($.labeled_parameter),
      repeat1($._statement),
      'end',
      optional(field('end_name', $.identifier)),
    )),

    labeled_handler: $ => prec.right(10, seq(
      'to',
      field('name', $.identifier),
      optional($.direct_parameter),
      repeat($.labeled_parameter),
      repeat1($._statement),
      'end',
      optional(field('end_name', $.identifier)),
    )),

    direct_parameter: $ => prec(1, field('parameter', $.identifier)),

    labeled_parameter: $ => prec(2, seq(
      field('label', $.identifier),
      field('parameter', $.identifier),
    )),

    parameter_list: $ => seq(
      $.identifier,
      repeat(seq(',', $.identifier)),
    ),

    // Application Command
    application_command: $ => prec.right(1, seq(
      field('command', $.identifier),
      repeat1(choice(
        $.direct_parameter,
        $.command_parameter,
        $.expression,
      )),
      optional(choice(
        $.with_clause,
        $.without_clause,
      )),
    )),

    command_parameter: $ => seq(
      field('label', $.identifier),
      field('value', choice($.identifier, $.expression)),
    ),

    with_clause: $ => seq(
      'with',
      field('option', $.property_name),
    ),

    without_clause: $ => seq(
      'without',
      field('option', $.property_name),
    ),

    // Property name (can be multi-word)
    property_name: $ => choice(
      $.identifier,
      seq($.identifier, repeat1($.identifier)),
    ),

    // Expression Statement
    expression_statement: $ => $.expression,

    // Expressions
    expression: $ => choice(
      $.binary_expression,
      $.unary_expression,
      $.parenthesized_expression,
      $.application_expression,
      $.property_access,
      $.element_access,
      $.list,
      $.record,
      $.identifier,
      $.string,
      $.number,
      $.boolean,
      $.reference_expression,
    ),

    binary_expression: $ => {
      const table = [
        [prec.left, 12, '^'],
        [prec.left, 11, choice('*', '/', 'div', 'mod', '÷')],
        [prec.left, 10, choice('+', '-', '&')],
        [prec.left, 7, choice('and', 'or')],
        [prec.left, 6, choice(
          '=', '≠', '>', '<', '≥', '≤', '>=', '<=',
          'equals', 'is equal to', 'is equal', 'equal to',
          'is not', 'is not equal to', 'is not equal', 'isn\'t', 'isn\'t equal to',
          'is greater than', 'greater than', 'comes after',
          'is less than', 'less than', 'comes before',
          'is greater than or equal to', 'is greater than or equal',
          'is less than or equal to', 'is less than or equal',
        )],
        [prec.left, 5, choice(
          'contains', 'contain', 'does not contain', 'doesn\'t contain',
          'is in', 'is contained by',
          'is not in', 'is not contained by',
          'starts with', 'start with', 'begins with', 'begin with',
          'ends with', 'end with',
        )],
        [prec.left, 4, 'as'],
      ];

      return choice(...table.map(([fn, precedence, operator]) =>
        fn(precedence, seq(
          field('left', $.expression),
          field('operator', operator),
          field('right', $.expression),
        ))
      ));
    },

    unary_expression: $ => choice(
      prec(13, seq('-', field('operand', $.expression))),
      prec(13, seq('+', field('operand', $.expression))),
      prec(8, seq('not', field('operand', $.expression))),
    ),

    parenthesized_expression: $ => seq(
      '(',
      $.expression,
      ')',
    ),

    application_expression: $ => prec(14, seq(
      'application',
      field('name', $.string),
    )),

    property_access: $ => prec.left(15, seq(
      field('object', $.expression),
      '\'s',
      field('property', $.property_name),
    )),

    element_access: $ => prec.left(15, seq(
      field('element', $.property_name),
      choice(
        seq(field('index', $.number), 'of', field('object', $.expression)),
        seq('of', field('object', $.expression)),
      ),
    )),

    reference_expression: $ => seq(
      choice('a ref to', 'a reference to', 'ref to', 'reference to'),
      field('target', $.expression),
    ),

    // Literals
    identifier: $ => choice(
      /[A-Za-z_][A-Za-z0-9_]*/,
      seq('|', /[^|]+/, '|'),
    ),

    string: $ => seq(
      '"',
      repeat(choice(
        /[^"\\]+/,
        /\\./,
      )),
      '"',
    ),

    number: $ => choice(
      $.integer,
      $.real,
    ),

    integer: $ => /[0-9]+/,

    real: $ => choice(
      /[0-9]+\.[0-9]+/,
      /[0-9]+(\.[0-9]+)?[eE][+-]?[0-9]+/,
    ),

    boolean: $ => choice('true', 'false', 'yes', 'no'),

    list: $ => seq(
      '{',
      optional(seq(
        $.expression,
        repeat(seq(',', $.expression)),
        optional(','),
      )),
      '}',
    ),

    record: $ => seq(
      '{',
      optional(seq(
        $.record_entry,
        repeat(seq(',', $.record_entry)),
        optional(','),
      )),
      '}',
    ),

    record_entry: $ => seq(
      field('key', choice($.identifier, $.string)),
      ':',
      field('value', $.expression),
    ),
  },
});
