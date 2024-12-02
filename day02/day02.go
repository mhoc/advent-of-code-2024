package day02

import (
	"strings"
)

type Day02Output struct {
	safeReportsWithDampenerCount    int
	safeReportsWithoutDampenerCount int
}

func Day02() (Day02Output, error) {
	lines := strings.Split(day02Input, "\n")

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
		safeReportsWithDampenerCount:    safeReportsWithDampenerCount,
		safeReportsWithoutDampenerCount: safeReportsWithoutDampenerCount,
	}, nil
}
