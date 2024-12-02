package day01

import (
	"fmt"
	"math"
	"time"

	"github.com/mhoc/advent-of-code-2024/sortedslice"
)

type Day01Output struct {
	Duration        time.Duration
	SimilarityScore int
	TotalDistance   int
}

func Day01(filename string) (Day01Output, error) {
	at := time.Now()

	input, err := NewParserFromFile(filename)
	if err != nil {
		panic(err)
	}

	parsed, err := input.Parse()
	if err != nil {
		return Day01Output{}, fmt.Errorf("error parsing input: %v", err)
	}

	ss1 := sortedslice.NewSortedSlice[int]()
	ss2 := sortedslice.NewSortedSlice[int]()
	for _, line := range parsed {
		ss1.Append(line[0])
		ss2.Append(line[1])
	}

	totalDistance := 0.0
	for i := 0; i < ss1.Len(); i++ {
		v1 := ss1.Get(i)
		v2 := ss2.Get(i)
		distance := math.Abs(float64(v1 - v2))
		totalDistance += distance
	}

	frequency := make(map[int]int)
	for _, line := range parsed {
		if count, in := frequency[line[1]]; in {
			frequency[line[1]] = count + 1
		} else {
			frequency[line[1]] = 1
		}
	}

	similarityScore := 0
	for i := 0; i < ss1.Len(); i++ {
		v1 := ss1.Get(i)
		v1Lidl2Frequency := frequency[v1]
		similarityScore += v1 * v1Lidl2Frequency
	}

	return Day01Output{
		Duration:        time.Since(at),
		SimilarityScore: similarityScore,
		TotalDistance:   int(totalDistance),
	}, nil
}
