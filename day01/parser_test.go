package day01

import "testing"

func TestParse(t *testing.T) {
	parser := NewParserFromBytes([]byte(`1 2
3 5
4 6`))
	r, err := parser.Parse()
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}
	expect := [][]int{
		{1, 2},
		{3, 5},
		{4, 6},
	}
	for lineno := range expect {
		if len(expect[lineno]) != len(r[lineno]) {
			t.Fatalf("expected len(line %v) to be %v, got %v", lineno, len(expect[lineno]), len(r[lineno]))
		}
		for vno := range expect[lineno] {
			if expect[lineno][vno] != r[lineno][vno] {
				t.Fatalf("expected line[%v][%v] to be %v, got %v", lineno, vno, expect[lineno][vno], r[lineno][vno])
			}
		}
	}
}
