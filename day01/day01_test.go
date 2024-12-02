package day01

import (
	"fmt"
	"os"
	"testing"
	"text/tabwriter"

	"github.com/mhoc/termcolor"
)

func TestDay01(t *testing.T) {
	output, err := Day01()
	if err != nil {
		t.Fatal(err)
	}

	tw := tabwriter.NewWriter(os.Stdout, 0, 8, 2, ' ', 0)
	fmt.Fprintf(tw, termcolor.LightGreen("Day 01\tPart 1\tTotal Distance\t%v")+"\n", output.TotalDistance)
	fmt.Fprintf(tw, termcolor.LightGreen("Day 01\tPart 2\tSimilarity Score\t%v")+"\n", output.SimilarityScore)
	fmt.Fprintf(tw, termcolor.LightGreen("--\t--\tDuration\t%v")+"\n", output.Duration)
	tw.Flush()
}
