package day02

import "testing"

func TestIsSafeWithoutDampener(t *testing.T) {
	report, _ := NewReportFromString(`1 2 3 4 5`)
	if !report.IsSafeWithoutDampener() {
		t.Fatalf("expected report to be safe; it wasn't")
	}
	report, _ = NewReportFromString(`10 7`)
	if !report.IsSafeWithoutDampener() {
		t.Fatalf("expected report to be safe; it wasn't")
	}
	report, _ = NewReportFromString(`10 5 2`)
	if report.IsSafeWithoutDampener() {
		t.Fatalf("expected report '10 5 2' to be unsafe; it wasn't")
	}
	report, _ = NewReportFromString(`10 8 9 10`)
	if report.IsSafeWithoutDampener() {
		t.Fatalf("expected report '10 8 9 10' to be unsafe; it wasn't")
	}
}

func TestIsSafeWithDampener(t *testing.T) {
	report, _ := NewReportFromString(`1 2 3 4 5`)
	if !report.IsSafeWithDampener() {
		t.Fatalf("expected report to be safe; it wasn't")
	}
	report, _ = NewReportFromString(`1 3 2 4 5`)
	if !report.IsSafeWithDampener() {
		t.Fatalf("expected report '1 3 2 4 5' to be safe; it wasn't")
	}

}
