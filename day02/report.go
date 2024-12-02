package day02

import (
	"fmt"
	"math"
	"strconv"
	"strings"
)

type Report struct {
	levels []int
}

func NewReportFromLevels(levels []int) Report {
	return Report{
		levels: levels,
	}
}

func NewReportFromString(s string) (Report, error) {
	levelsStr := strings.Split(s, " ")
	levels := make([]int, 0)
	for _, levelStr := range levelsStr {
		level, err := strconv.Atoi(levelStr)
		if err != nil {
			return Report{}, fmt.Errorf("error converting string to int: '%v': %v", levelStr, err)
		}
		levels = append(levels, level)
	}
	return Report{
		levels: levels,
	}, nil
}

func (r Report) IsSafeWithoutDampener() bool {
	if len(r.levels) == 0 || len(r.levels) == 1 {
		return true
	}
	direction := ""
	for i := 1; i < len(r.levels); i++ {
		current := r.levels[i]
		prev := r.levels[i-1]
		if current == prev {
			return false
		}
		if direction == "" && current > prev {
			direction = "a"
		} else if direction == "" && current < prev {
			direction = "d"
		}
		if direction == "a" && current < prev {
			return false
		} else if direction == "d" && current > prev {
			return false
		}
		diff := math.Abs(float64(current - prev))
		if diff < 1 || diff > 3 {
			return false
		}
	}
	return true
}

func (r Report) IsSafeWithDampener() bool {
	if r.IsSafeWithoutDampener() {
		return true
	}
	for i := range r.levels {
		newReport := NewReportFromLevels(removeIndex(r.levels, i))
		if newReport.IsSafeWithoutDampener() {
			return true
		}
	}
	return false
}

func removeIndex(slice []int, index int) []int {
	result := make([]int, 0, len(slice)-1)
	result = append(result, slice[:index]...)
	result = append(result, slice[index+1:]...)
	return result
}
