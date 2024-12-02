package day01

import (
	"bytes"
	"fmt"
	"os"
	"strconv"
)

type Parser struct {
	data []byte
}

func NewParserFromBytes(b []byte) Parser {
	return Parser{
		data: b,
	}
}

func NewParserFromFile(filename string) (Parser, error) {
	f, err := os.ReadFile(filename)
	if err != nil {
		return Parser{}, fmt.Errorf("error reading file %v: %v", filename, err)
	}
	return Parser{
		data: f,
	}, nil
}

func (p Parser) Parse() ([][]int, error) {
	result := make([][]int, 0)
	lines := bytes.Split(p.data, []byte("\n"))
	for lineNo, line := range lines {
		lineResult := make([]int, 0)
		values := bytes.Split(line, []byte(" "))
		for _, value := range values {
			if len(value) == 0 {
				continue
			}
			v, err := strconv.Atoi(string(value))
			if err != nil {
				return result, fmt.Errorf("non-empty value '%v' on line %v cannot be parsed as int", string(value), lineNo)
			}
			lineResult = append(lineResult, v)
		}
		result = append(result, lineResult)
	}
	return result, nil
}
