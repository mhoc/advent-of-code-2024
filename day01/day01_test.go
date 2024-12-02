package day01

import (
	"fmt"
	"os"
	"testing"
	"text/tabwriter"

	"github.com/mhoc/termcolor"
)

func TestDay01(t *testing.T) {
	output, err := Day01("./input")
	if err != nil {
		t.Fatal(err)
	}

	tw := tabwriter.NewWriter(os.Stdout, 0, 8, 2, ' ', 0)
	fmt.Fprintf(tw, termcolor.LightGreen("Day 01\tPart 1\tTotal Distance\t%v")+"\n", output.TotalDistance)
	fmt.Fprintf(tw, termcolor.LightGreen("Day 01\tPart 2\tSimilarity Score\t%v")+"\n", output.SimilarityScore)
	fmt.Fprintf(tw, termcolor.LightGreen("--\t--\tDuration\t%vμs")+"\n", output.Duration.Microseconds())
	tw.Flush()

	if output.TotalDistance != 2113135 {
		t.Fatalf("invalid total distance (%v) for provided input, expected %v", output.TotalDistance, 2113135)
	}
	if output.SimilarityScore != 19097157 {
		t.Fatalf("invalid similarity score (%v) for provided input, expected %v", output.SimilarityScore, 19097157)
	}
}
