# tree-sitter-applescript

A Tree-sitter parser for AppleScript, providing syntax analysis and highlighting for the AppleScript programming language.

## Features

This grammar supports the following AppleScript language features:

### Core Language Elements
- **Variables**: `set` and `copy` statements for variable assignment
- **Data Types**:
  - Numbers (integers and reals, including scientific notation)
  - Strings (with Unicode support)
  - Booleans (`true`, `false`, `yes`, `no`)
  - Lists `{1, 2, 3}`
  - Records `{name:"John", age:30}`

### Control Flow
- **Conditionals**: `if-then-else` statements with `else if` support
- **Loops**:
  - `repeat` (infinite loop)
  - `repeat N times`
  - `repeat while condition`
  - `repeat until condition`
  - `repeat with variable from start to end by step`
  - `repeat with variable in list`
- **Error Handling**: `try-on error-end try` blocks
- **Exit and Return**: `exit repeat`, `return value`

### Application Scripting
- **Tell Statements**: `tell application "AppName"` blocks
- **Application Expressions**: `application "AppName"`

### Advanced Features
- **Handlers/Functions**:
  - Simple handlers: `on handlerName(param1, param2)`
  - Positional handlers: `on handlerName directParam`
  - Labeled handlers: `to handlerName given label:param`
- **Scripts**: Script objects with properties and handlers
- **Properties**: `property name : value`
- **Timeout Blocks**: `with timeout of N seconds`
- **Transaction Blocks**: `with transaction`
- **Considering/Ignoring**: Text comparison attribute control

### Operators
- **Arithmetic**: `+`, `-`, `*`, `/`, `÷`, `^`, `div`, `mod`
- **Comparison**: `=`, `≠`, `>`, `<`, `≥`, `≤`, `>=`, `<=`
- **Word-based Comparisons**: `is equal to`, `is greater than`, `comes after`, etc.
- **Logical**: `and`, `or`, `not`
- **Containment**: `contains`, `is in`, `starts with`, `ends with`
- **Concatenation**: `&`
- **Coercion**: `as`

### Comments
- Line comments: `-- comment`
- Unix-style comments: `# comment` (AppleScript 2.0+)
- Block comments: `(* multi-line comment *)`

## Installation

```bash
npm install
```

## Development

### Generate Parser

After making changes to `grammar.js`, regenerate the parser:

```bash
npx tree-sitter generate
```

### Build Parser

Compile the parser:

```bash
npx tree-sitter build
```

### Run Tests

```bash
npx tree-sitter test
```

### Parse a File

```bash
npx tree-sitter parse path/to/file.applescript
```

### Interactive Playground

Open an interactive web interface to test the grammar:

```bash
npx tree-sitter playground
```

## Project Structure

```
.
├── grammar.js              # Grammar definition
├── src/                    # Generated parser source (C)
├── queries/                # Syntax highlighting queries
│   └── highlights.scm
├── test/
│   └── corpus/            # Test cases
│       └── basics.txt
├── examples/              # Example AppleScript files
│   └── sample.applescript
├── package.json
└── README.md
```

## Usage

### In Neovim

1. Install the parser:
   ```bash
   mkdir -p ~/.local/share/nvim/site/pack/tree-sitter/start/tree-sitter-applescript
   cp -r . ~/.local/share/nvim/site/pack/tree-sitter/start/tree-sitter-applescript
   ```

2. Configure in your Neovim config:
   ```lua
   require'nvim-treesitter.configs'.setup {
     ensure_installed = { "applescript" },
     highlight = { enable = true },
   }
   ```

### In Atom

1. Install `language-applescript` package
2. Add this parser to the package's grammars directory

### In Emacs

Use `tree-sitter-mode` with this grammar for AppleScript syntax highlighting.

## Known Limitations

- The `given` keyword syntax for labeled parameters is not fully supported
- Some advanced AppleScript features like raw event codes (`« »`) are not yet implemented
- Application-specific commands and terminologies are parsed as generic expressions

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

### Adding Tests

Add test cases to `test/corpus/*.txt` using this format:

```
================================================================================
Test Name
================================================================================

input code here

--------------------------------------------------------------------------------

(expected_parse_tree)
```

## Resources

- [AppleScript Language Guide](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/)
- [Tree-sitter Documentation](https://tree-sitter.github.io/tree-sitter/)

## License

MIT
