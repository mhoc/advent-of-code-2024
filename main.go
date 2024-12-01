package main

import (
	"flag"
	"fmt"
	"strconv"

	"github.com/mhoc/advent-of-code-2024/day01"
)

func main() {
	dayStr := flag.String("day", "0", "the day to execute (e.g. '1')")
	flag.Parse()
	day, err := strconv.Atoi(*dayStr)
	if err != nil {
		panic(fmt.Sprintf("non-integer day provided: %v", *dayStr))
	}
	switch day {
	case 1:
		day01.Day01()
	default:
		panic(fmt.Sprintf("day provided is out of bounds: %v", *dayStr))
	}
}
