# advent-of-code-2024

Solutions are implemented as tests; to run e.g. Day 1:

```
go test -v -run TestDay01 ./...
```

The solutions for all days can be executed by simply running all the tests which start with `TestDay`:

```
go test -v -run TestDay.+ ./...
```

There are, of course, more tests than just the solution-oriented tests:

```
go test ./...
```
