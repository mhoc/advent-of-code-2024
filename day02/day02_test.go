package day02

import (
	"fmt"
	"os"
	"testing"
	"text/tabwriter"

	"github.com/mhoc/termcolor"
)

func TestDay02(t *testing.T) {
	output, err := Day02()
	if err != nil {
		t.Fatal(err)
	}

	tw := tabwriter.NewWriter(os.Stdout, 0, 8, 2, ' ', 0)
	fmt.Fprintf(tw, termcolor.LightGreen("Day 02\tPart 1\tSafe Reports Without Dampener\t%v")+"\n", output.safeReportsWithoutDampenerCount)
	fmt.Fprintf(tw, termcolor.LightGreen("Day 02\tPart 2\tSafe Reports With Dampener\t%v")+"\n", output.safeReportsWithDampenerCount)
	// fmt.Fprintf(tw, termcolor.LightGreen("--\t--\tDuration\t%v")+"\n", output.Duration)
	tw.Flush()
}
