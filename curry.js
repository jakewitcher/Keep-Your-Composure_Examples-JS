const R = require("ramda");

// example 1

const add = (x, y) => [x, x + y];
const multiply = ([x, y]) => x * y;

const doSomeMath = R.compose(
  multiply,
  add
);

const answer = doSomeMath(2, 5);

console.log(answer); // 14

const sum = (x, y) => ({
  a: x,
  b: x + y
});

const product = ({ a, b }) => a * b;

const doSomeMath2 = R.compose(
  product,
  sum
);

const answer2 = doSomeMath2(3, 4);

console.log(answer2); // 21

// example 2
// this example of a curry function is from "Professor Frisby's Mostly Adequate Guide to Functional Programming"
// which you can find at https://mostly-adequate.gitbooks.io/mostly-adequate-guide/appendix_a.html#curry

function curry(fn) {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}

// example 3

const addFourNumbers = (a, b, c, d) => a + b + c + d;
const curryAdd = curry(addFourNumbers);
// returns the function "$curry" which remembers the function "addFourNumbers"
// and is ready to receive the first argument

const firstNumber = curryAdd(2);
// only one argument is received.
// this is checked against the arity of "addFourNumbers"
// 1 < 4 so a new version of $curry is returned which stores the first argument, 2.

const secondAndThirdNumbers = firstNumber(4, 6);
// this time two arguments are provided
// the initial argument 2 is remembered for a total of 3 arguments
// 3 is still less than 4 so another new version of $curry is returned, now storing 2, 4, and 6

const finalNumber = secondAndThirdNumbers(8);
// the last argument is provided.
// now the length of the array of arguments is equal to the arity of "addFourNumbers"
// this time instaead of calling "bind" on $curry, "call" is invoked on "addFourNumbers" and given all 4 arguments

console.log(finalNumber); // 20

// example 4
// const transaction = {
//   customer: "Sam Winchester",
//   promoCode: "promo30",
//   items: [
//     { name: "50 lb. bag of salt", price: 20 },
//     { name: "plaid shirt", price: 35 },
//     { name: "Kansas: Greatest Hits", price: 15 }
//   ]
// };

// getPrices = item => item.price;
// promo30 = price => price - price * 0.3;
// salesTax = price => price + price * 0.065;
// shipping = price => price + 8.99;
// format = price => price.toFixed(2);
// sumTotal = (total, current) => current + total;
// message = price => `Your total is $${price}`;

// printTotal = R.compose(
//   message,
//   format,
//   shipping,
//   R.reduce(sumTotal, 0),
//   R.map(salesTax),
//   R.map(promo30),
//   R.map(getPrices)
// );

// result = printTotal(transaction.items);

// console.log(result);

// example 5
const map = (fn, array) => array.map(fn);
const curryMap = curry(map);

plusThree = curryMap(a => a + 3);
console.log(plusThree([1, 2, 3])); // [4, 5, 6]

// example 6
const transaction2 = {
  customer: "Sam Winchester",
  promoCode: "promo30",
  items: [
    { name: "50 lb. bag of salt", price: 20 },
    { name: "plaid shirt", price: 35 },
    { name: "Kansas: Greatest Hits", price: 15 }
  ]
};

getPrices2 = item => item.price;
promo20 = price => price - price * 0.2;
salesTax2 = price => price + price * 0.065;
shipping2 = price => price + 8.99;
format2 = price => price.toFixed(2);
sumTotal2 = (total, current) => current + total;
message2 = price => `Your total is $${price}`;

const transformPrices = R.compose(
  salesTax2,
  promo20,
  getPrices2
);

printTotal2 = R.compose(
  message2,
  format2,
  shipping2,
  R.reduce(sumTotal2, 0),
  R.map(transformPrices)
);

result2 = printTotal2(transaction2.items);

console.log(result2);

// exmaple 7
add1 = x => x + 1;
multiply2 = x => x * 2;

versionOne = R.compose(
  R.map(add1),
  R.map(multiply2)
);

versionTwo = R.map(
  R.compose(
    add1,
    multiply2
  )
);

console.log(versionOne([1, 2, 3])); // [3, 5, 7]
console.log(versionTwo([1, 2, 3])); // [3, 5, 7]
