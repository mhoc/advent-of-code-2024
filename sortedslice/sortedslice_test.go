package sortedslice

import "testing"

func TestSortedSliceAppend(t *testing.T) {
	ss := NewSortedSlice[int32]()
	ss.Append(5)
	ss.Append(4)
	ss.Append(8)
	if len(ss.list) != 3 {
		t.Fatalf("expected list to be len(3), got %v", len(ss.list))
	}
	if ss.list[0] != 4 {
		t.Fatalf("expected list[0] to be 4, got %v", ss.list[0])
	}
	if ss.list[1] != 5 {
		t.Fatalf("expected list[1] to be 5, got %v", ss.list[1])
	}
	if ss.list[2] != 8 {
		t.Fatalf("expected list[2] to be 8, got %v", ss.list[2])
	}
}
