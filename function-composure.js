const R = require("ramda");

// example 1
const addTwo = x => x + 2;
const multiplyThree = x => x * 3;
const msg = x => `The answer is ${x}`;

const doSomeMath = R.compose(
  msg,
  multiplyThree,
  addTwo
);

console.log(doSomeMath(3));
console.log(doSomeMath(50));

// example 2
const doSomeMath1 = R.compose(
  msg,
  addTwo,
  multiplyThree
);

const doSomeMath2 = x => msg(addTwo(multiplyThree(x)));

// example 3
arr = [1, 2, 3, 4, 5, 6];
sum = arr.reduce((accumulator, current) => accumulator + current);
console.log(sum);

// example 4
arr2D2 = [2, 4, 6, 8, 10];
sumPlusTen = arr2D2.reduce((accumulator, current) => accumulator + current, 10);
console.log(sumPlusTen);

// example 5
compose = (...fns) => {
  return arg => fns.reduceRight((value, fn) => fn(value), arg);
};

numPlusTwo = compose(
  msg,
  addTwo
);

console.log(numPlusTwo(7));

// example 6
composePlus = (...fns) => {
  return (...args) => fns.reduceRight((value, fn) => [fn(...value)], args)[0];
};

const add = (x, y) => x + y;

sumPlusTwo = composePlus(msg, addTwo, add);

console.log(sumPlusTwo(4, 5));

// example 7
const transaction = {
  customer: "Dean Winchester",
  item: "50 lb. bag of salt",
  promoCode: "promo30",
  price: 20
};

promo30 = price => price - price * 0.3;
salesTax = price => price + price * 0.065;
shipping = price => price + 8.99;
format = price => price.toFixed(2);
message = price => `Your total is $${price}`;

total = R.compose(
  message,
  format,
  shipping,
  salesTax,
  promo30
);

result = total(transaction.price);

console.log(result);

// example 8
const transaction2 = {
  customer: "Sam Winchester",
  item: "plaid shirt",
  promoCode: "promo20",
  price: 35
};

promo20 = price => price - price * 0.2;
promo10 = price => price - price * 0.1;
salesTax2 = price => price + price * 0.065;
shipping2 = price => price + 8.99;
format2 = price => price.toFixed(2);
message2 = price => `Your total is $${price}`;

checkPromo = transaction => {
  switch (transaction.promoCode) {
    case "promo10":
      return promo10;
    case "promo20":
      return promo20;
  }
};

promo = checkPromo(transaction2);

total2 = R.compose(
  message2,
  format2,
  shipping2,
  salesTax2,
  promo
);

result2 = total2(transaction2.price);

console.log(result2);
