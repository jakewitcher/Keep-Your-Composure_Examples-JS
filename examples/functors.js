const R = require("ramda");

// example 1
const transaction = {
  customer: "Dean Winchester",
  item: "Kansas: Greatest Hits",
  promoCode: "promo30",
  price: 15
};

const promo30 = price => price - price * 0.3;
const salesTax = price => price + price * 0.065;
const shipping = price => price + 4.99;
const format = price => price.toFixed(2);
const message = price => `Your total is $${price}`;

const total = R.compose(
  message,
  format,
  shipping,
  salesTax,
  promo30
);

const result = total(transaction.price);

console.log(result); // Your total is $16.17

// example 2
const result2 = total(true);
console.log(result2); // Your total is $5.74
const result3 = total("bunnies");
console.log(result3); // Your total is $NaN

// example 3
class MaybeNumber {
  constructor(x) {
    this.value = x;
  }

  static of(x) {
    return new MaybeNumber(x);
  }

  get isNumber() {
    return typeof this.value === "number";
  }

  map(f) {
    return this.isNumber ? JustNumber.of(f(this.value)) : Nothing.of();
  }

  inspect() {
    console.log(this.value);
  }
}

// example 4
const num = MaybeNumber.of(9);
const notNum = MaybeNumber.of(true);

console.log(num.inspect()); // 9
console.log(notNum.inspect()); // true

// example 5
class JustNumber {
  constructor(x) {
    this.value = x;
  }

  static of(x) {
    return new JustNumber(x);
  }

  map(f) {
    return JustNumber.of(f(this.value));
  }

  inspect() {
    console.log(this.value);
  }
}

class Nothing {
  constructor() {
    this.value = "Nothing";
  }

  static of(x) {
    return new Nothing();
  }

  map(f) {
    return Nothing.of();
  }

  inspect() {
    console.log(this.value);
  }
}

// example 6
const add1 = x => x + 1;

const transformNum = R.map(add1, num);
const transformNotNum = R.map(add1, notNum);

console.log(transformNum.inspect()); // 10
console.log(transformNotNum.inspect()); // Nothing

// example 7
const map = (fn, functor) => functor.map(fn);

// example 8
const transaction2 = {
  customer: "Dean Winchester",
  item: "Kansas: Greatest Hits",
  promoCode: "promo30",
  price: 15
};

const promo30_2 = price => price - price * 0.3;
const salesTax2 = price => price + price * 0.065;
const shipping2 = price => price + 4.99;
const format2 = price => price.toFixed(2);
const message2 = price => `Your total is $${price}`;

const total2 = R.compose(
  message2,
  format2,
  shipping2,
  salesTax2,
  promo30_2
);

const handleTransaction = R.compose(
  R.map(total2),
  MaybeNumber.of
);

const resultA = handleTransaction(transaction2.price);
const resultB = handleTransaction(true);
const resultC = handleTransaction("bunnies");

console.log(resultA.inspect()); // Your total is $16.17
console.log(resultB.inspect()); // Nothing
console.log(resultC.inspect()); // Nothing
