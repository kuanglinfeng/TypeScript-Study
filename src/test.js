function foo(n) {
  if (n === 1) return [n]

  return foo(n - 1).concat(n)
}

