package sortedslice

import (
	"cmp"
	"slices"
)

type SortedSlice[T cmp.Ordered] struct {
	list []T
}

func NewSortedSlice[T cmp.Ordered]() SortedSlice[T] {
	return SortedSlice[T]{
		list: make([]T, 0),
	}
}

func (ss *SortedSlice[T]) Append(v T) {
	i, _ := slices.BinarySearch(ss.list, v)
	ss.list = append(ss.list, v)
	copy(ss.list[i+1:], ss.list[i:])
	ss.list[i] = v
}

func (ss SortedSlice[T]) Get(i int) T {
	return ss.list[i]
}

func (ss SortedSlice[T]) Len() int {
	return len(ss.list)
}
