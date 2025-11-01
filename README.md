# tree-sitter-applescript

Tree-sitter grammar for AppleScript with 90% test coverage (45/50 tests passing).

## Features

### Core Language
- **Variables**: `set`, `copy` assignments
- **Data Types**: Numbers, strings, booleans, `missing value`, lists, records
- **Control Flow**: `if-then-else`, `repeat` (all variants), `try-on error`
- **Operators**: Arithmetic, comparison, logical, containment, type casting (`as`)
- **Comments**: `--`, `#`, `(* *)` with line continuations (`¬`, `\`)

### Application Scripting
- **Tell blocks**: `tell application "Finder"` with nested commands
- **Application expressions**: `application "AppName"`
- **Multi-word commands**: `do shell script`, `system attribute`, `path to`, etc.
- **Multi-word properties**: `current window`, `front document`, `selected tab`, etc.

### Advanced Features
- **Handlers**: Simple `on name()`, positional `on name param`, labeled `to name given label:value`
- **Properties**: `property name : value`
- **Use statements**: Framework imports, scripting additions, AppleScript version
- **AppleScriptObjC**: `current application`, Objective-C method calls (`stringWithString:`)
- **Script objects**: Nested scripts with properties and handlers
- **Timeout/Transaction blocks**

### External Scanner
Uses a C-based scanner for context-sensitive patterns:
- `path to` command recognition
- Objective-C method call labels (`identifier:`)

## Installation

```bash
npm install tree-sitter-applescript
```

## Quick Start

```bash
# Generate parser after grammar changes
tree-sitter generate

# Build parser
tree-sitter build

# Run tests
tree-sitter test

# Parse a file
tree-sitter parse examples/sample.applescript

# Interactive playground
tree-sitter playground
```

## Project Structure

```
.
├── grammar.js              # Grammar definition
├── src/
│   ├── parser.c           # Generated parser
│   └── scanner.c          # External scanner (C)
├── queries/
│   └── highlights.scm     # Syntax highlighting
├── test/corpus/           # Test cases
├── bindings/              # Language bindings (C, Go, Node, Python, Rust, Swift)
└── CLAUDE.md             # Development guide for Claude Code
```

## Editor Integration

### Neovim with nvim-treesitter

```lua
require'nvim-treesitter.configs'.setup {
  ensure_installed = { "applescript" },
  highlight = { enable = true },
}
```

### Manual Installation

```bash
mkdir -p ~/.local/share/nvim/site/parser
cp build/parser.so ~/.local/share/nvim/site/parser/applescript.so
```

## Known Limitations

**5 unsupported patterns (10% of tests):**

1. **Labeled command parameters** - `do JavaScript code in document 1`
   - **Workaround**: Use tell blocks (`tell document 1` then `do JavaScript code`)
   - **Status**: Deferred - requires complex context tracking

2. **Objective-C handler syntax** - `on doJava:action onType:type` (2 tests)
   - **Workaround**: Use traditional labeled parameters
   - **Status**: Deferred - requires Phase 2 scanner enhancements

See `ISSUES.md` for detailed analysis and `CLAUDE.md` for development guidance.

## Development

This grammar uses:
- **Conflict resolution**: 16 carefully managed conflicts for AppleScript ambiguities
- **Precedence rules**: Dynamic and static precedence for multi-word patterns
- **External scanner**: C scanner for context-sensitive tokenization
- **Comprehensive tests**: 50 test cases covering all major language features

Key files:
- `grammar.js` - Grammar rules (650+ lines)
- `src/scanner.c` - External scanner for advanced patterns
- `SCANNER.md` - Scanner documentation and extension guide
- `ISSUES.md` - Known limitations and workarounds

## Resources

- [AppleScript Language Guide](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/)
- [Tree-sitter Documentation](https://tree-sitter.github.io/tree-sitter/)
- [Development Guide](CLAUDE.md) - Commands, architecture, and known issues

## License

MIT License - Copyright (c) 2025 Tom Waddington
