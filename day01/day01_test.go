package day01

import (
	"fmt"
	"testing"
)

func TestDay01(t *testing.T) {
	d := Day01{}
	output, err := d.Exec("./input")
	if err != nil {
		t.Fatal(err)
	}
	fmt.Printf("          Day01 / Part01 - Total Distance: %v \n", output.TotalDistance)
	fmt.Printf("          Day01 / Part02 - Similarity Score: %v \n", output.SimilarityScore)
	if output.TotalDistance != 2113135 {
		t.Fatalf("Incorrect total distance")
	}
	if output.SimilarityScore != 19097157 {
		t.Fatalf("Incorrect similarity score")
	}
}
