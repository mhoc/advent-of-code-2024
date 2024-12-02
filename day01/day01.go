package day01

import (
	"fmt"
	"math"
	"time"
)

type Day01Output struct {
	Duration        time.Duration
	SimilarityScore int
	TotalDistance   int
}

func Day01(inputFilename string) (Day01Output, error) {
	at := time.Now()

	input, err := NewInputFromFile(inputFilename)
	if err != nil {
		return Day01Output{}, fmt.Errorf("error reading input from file: %v", err)
	}

	lidl1, lidl2, err := input.Parse()
	if err != nil {
		return Day01Output{}, fmt.Errorf("error parsing input: %v", err)
	}

	totalDistance := 0.0
	for i := 0; i < lidl1.Len(); i++ {
		v1 := lidl1.Get(i)
		v2 := lidl2.Get(i)
		distance := math.Abs(float64(v1 - v2))
		totalDistance += distance
	}

	similarityScore := 0
	for i := 0; i < lidl1.Len(); i++ {
		v1 := lidl1.Get(i)
		v1Lidl2Frequency := lidl2.Frequency(v1)
		similarityScore += v1 * v1Lidl2Frequency
	}

	return Day01Output{
		Duration:        time.Since(at),
		SimilarityScore: similarityScore,
		TotalDistance:   int(totalDistance),
	}, nil
}
