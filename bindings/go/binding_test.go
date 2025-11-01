package tree_sitter_applescript_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_applescript "github.com/waddie/tree-sitter-applescript/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_applescript.Language())
	if language == nil {
		t.Errorf("Error loading AppleScript grammar")
	}
}
