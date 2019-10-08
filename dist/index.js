function sum(numbers, callback) {
    let s = 0;
    numbers.forEach(value => {
        if (callback(value)) {
            s += value;
        }
    });
    return s;
}
sum([1, 2, 3, 4, 5], value => value % 2 === 0);
