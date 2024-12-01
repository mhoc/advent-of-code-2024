package day01

import (
	"testing"
)

func TestLocationIDListCreate(t *testing.T) {
	NewLocationIDList()
}

func TestLocationIDListAppend(t *testing.T) {
	lidl := NewLocationIDList()
	lidl.Append(0)
	lidl.Append(2)
	lidl.Append(1)
	lidl.Append(6)
	lidl.Append(3)
	if len(lidl.list) != 5 {
		t.Fatal("len([]) should be 5")
	}
	if lidl.list[0] != 0 {
		t.Fatal("[0] should be 0")
	}
	if lidl.list[1] != 1 {
		t.Fatal("[1] should be 1")
	}
	if lidl.list[2] != 2 {
		t.Fatal("[2] should be 2")
	}
	if lidl.list[3] != 3 {
		t.Fatal("[3] should be 3")
	}
	if lidl.list[4] != 6 {
		t.Fatal("[4] should be 6")
	}
}

func TestLocationIDListLen(t *testing.T) {
	lidl := NewLocationIDList()
	lidl.Append(0)
	lidl.Append(2)
	lidl.Append(1)
	if lidl.Len() != 3 {
		t.Fatalf("expected length to be 3, got %v", lidl.Len())
	}
}

func TestLocationIDListLenEmpty(t *testing.T) {
	lidl := NewLocationIDList()
	if lidl.Len() != 0 {
		t.Fatalf("expected length to be 0, got %v", lidl.Len())
	}
}
