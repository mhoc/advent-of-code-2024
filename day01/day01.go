package day01

import (
	"fmt"
	"math"
)

func Day01() {
	input, err := NewInputFromFile("./day01/input")
	if err != nil {
		panic(err)
	}

	lidl1, lidl2, err := input.Parse()
	if err != nil {
		panic(err)
	}

	totalDistance := 0.0
	for i := 0; i < lidl1.Len(); i++ {
		v1 := lidl1.Get(i)
		v2 := lidl2.Get(i)
		distance := math.Abs(float64(v1 - v2))
		totalDistance += distance
	}

	fmt.Printf("total distance: %.0f \n", totalDistance)

	similarityScore := 0
	for i := 0; i < lidl1.Len(); i++ {
		v1 := lidl1.Get(i)
		v1Lidl2Frequency := lidl2.Frequency(v1)
		similarityScore += v1 * v1Lidl2Frequency
	}

	fmt.Printf("similarity score: %v \n", similarityScore)
}
