package day02

import (
	"os"
	"strings"
	"time"
)

type Day02Output struct {
	Duration                        time.Duration
	SafeReportsWithDampenerCount    int
	SafeReportsWithoutDampenerCount int
}

func Day02(filename string) (Day02Output, error) {
	at := time.Now()

	file, err := os.ReadFile(filename)
	if err != nil {
		return Day02Output{}, err
	}
	lines := strings.Split(string(file), "\n")

	safeReportsWithoutDampenerCount := 0
	safeReportsWithDampenerCount := 0
	for _, line := range lines {
		report, err := NewReportFromString(line)
		if err != nil {
			panic(err)
		}
		if report.IsSafeWithoutDampener() {
			safeReportsWithoutDampenerCount++
		}
		if report.IsSafeWithDampener() {
			safeReportsWithDampenerCount++
		}
	}

	return Day02Output{
		Duration:                        time.Since(at),
		SafeReportsWithDampenerCount:    safeReportsWithDampenerCount,
		SafeReportsWithoutDampenerCount: safeReportsWithoutDampenerCount,
	}, nil
}
