package day01

import "slices"

type LocationIDList struct {
	frequency map[int]int
	list      []int
}

func NewLocationIDList() LocationIDList {
	return LocationIDList{
		frequency: make(map[int]int),
		list:      make([]int, 0),
	}
}

func (l *LocationIDList) Append(v int) {
	i, _ := slices.BinarySearch(l.list, v)
	l.list = append(l.list, 0)
	copy(l.list[i+1:], l.list[i:])
	l.list[i] = v
	if count, in := l.frequency[v]; in {
		l.frequency[v] = count + 1
	} else {
		l.frequency[v] = 1
	}
}

func (l LocationIDList) Frequency(v int) int {
	return l.frequency[v]
}

func (l LocationIDList) Get(i int) int {
	return l.list[i]
}

func (l LocationIDList) Len() int {
	return len(l.list)
}
