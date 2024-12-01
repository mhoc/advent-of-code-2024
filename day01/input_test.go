package day01

import "testing"

func TestNewInputFromBytes(t *testing.T) {
	NewInputFromBytes([]byte("hello world"))
}

func TestNewInputFromFile(t *testing.T) {
	NewInputFromFile("./input")
}

func TestInputParse(t *testing.T) {
	input := NewInputFromBytes([]byte(`58990   83989
26183   15707
48195   12659
20176   26012`))
	lidl1, lidl2, err := input.Parse()
	if err != nil {
		t.Fatal(err)
	}
	expect1 := []int{20176, 26183, 48195, 58990}
	if len(lidl1.list) != len(expect1) {
		t.Fatalf("expected lidl1 length to be %v, got %v", len(expect1), len(lidl1.list))
	}
	for i, expect := range expect1 {
		if expect != lidl1.list[i] {
			t.Fatalf("expected lidl1[%v] to be %v; got %v", i, expect, lidl1.list[i])
		}
	}

	expect2 := []int{12659, 15707, 26012, 83989}
	if len(lidl2.list) != len(expect2) {
		t.Fatalf("expected lidl2 length to be %v, got %v", len(expect2), len(lidl2.list))
	}
	for i, expect := range expect2 {
		if expect != lidl2.list[i] {
			t.Fatalf("expected lidl2[%v] to be %v; got %v", i, expect, lidl2.list[i])
		}
	}
}
