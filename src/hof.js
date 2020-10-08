/* high order function */
const numbers = [1, 2, 3, 4, 5];

/* Обычный подход */
// const newNumbers = [];
// for (let i = 0; i < numbers.length; i++) {
//     newNumbers.push(numbers[i] + 1);
// }
// console.log('newNumbers', newNumbers);

/* HOF */
function createAddNumber(number) {
    return function (arr) {
        return arr.map((i) => (i += number));
    };
}

/* переиспользуем, создавая новые функции */
const addOne = createAddNumber(1);
const addFive = createAddNumber(5);

/* в замыкание попадает массив numbers */
console.log(addOne(numbers));
console.log(addFive(numbers));
