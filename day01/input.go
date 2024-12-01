package day01

import (
	"bytes"
	"fmt"
	"os"
	"strconv"
)

type Input struct {
	data []byte
}

func NewInputFromBytes(b []byte) Input {
	return Input{
		data: b,
	}
}

func NewInputFromFile(filename string) (Input, error) {
	f, err := os.ReadFile(filename)
	if err != nil {
		return Input{}, fmt.Errorf("error reading file %v: %v", filename, err)
	}
	return Input{
		data: f,
	}, nil
}

func (i Input) Parse() (LocationIDList, LocationIDList, error) {
	lidl1 := NewLocationIDList()
	lidl2 := NewLocationIDList()

	lines := bytes.Split(i.data, []byte("\n"))
	for lineNo, line := range lines {
		lidl1Inserted := false
		values := bytes.Split(line, []byte(" "))
		for _, value := range values {
			if len(value) == 0 {
				continue
			}
			v, err := strconv.Atoi(string(value))
			if err != nil {
				return lidl1, lidl2, fmt.Errorf("non-empty value '%v' on line %v cannot be parsed as int", string(value), lineNo)
			}
			if !lidl1Inserted {
				lidl1.Append(v)
				lidl1Inserted = true
			} else {
				lidl2.Append(v)
				break
			}
		}
	}

	if lidl1.Len() != lidl2.Len() {
		return lidl1, lidl2, fmt.Errorf("input parsing length mismatch, %v != %v", lidl1.Len(), lidl2.Len())
	}

	return lidl1, lidl2, nil
}
