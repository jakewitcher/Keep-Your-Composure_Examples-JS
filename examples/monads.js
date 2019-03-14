const R = require("ramda");

// example 1
// a ->  b
const add1 = x => x + 1;
const gt10 = x => x > 10;
add1(10); // 11
gt10(11); // true

const isAtLeast10 = R.compose(
  gt10,
  add1
);

console.log(isAtLeast10(10)); // true

// example 2
// a ->  f b
const add1Array = x => [x, x + 1];
const multiply10Array = x => [x, x * 10];
add1Array(10); // [11]
multiply10Array(11); // [true]

// example 3
// f a -> (a -> b) -> f b
__map = (arr, fn) => arr.map(fn);
const add1Map = __map([1, 2, 3], add1);
const gt10map = __map([1, 2, 12], gt10);

console.log(add1Map); // [2, 3, 4]
console.log(gt10map); // [false, false, true]

// example 4
// f a -> (a -> f b) -> f (f b)
const mapToFunctor = (arr, fn) => arr.map(fn);
const squareTuple = mapToFunctor([1, 2, 3], x => [x, x * x]); // [[1, 1], [2, 4], [3, 9]]
console.log(squareTuple);

// example 5
// what you wanted as output
MaybeNumberA = { value: 12 };
// what you got instead by mapping over a Functor with an a -> f b function type
MaybeNumberB = { value: { value: 12 } };

// example 6
class MaybeNumber {
  constructor(x) {
    this.value = x;
  }

  static of(x) {
    return new MaybeNumber(x);
  }

  get isNumber() {
    return typeof this.value === "number" && !isNaN(this.value);
  }

  map(f) {
    return this.isNumber ? JustNumber.of(f(this.value)) : Nothing.of();
  }

  join() {
    return this.isNumber ? this.value : Maybe.of(null);
  }

  chain(f) {
    return this.map(f).join();
  }

  inspect() {
    console.log(`Maybe(${this.value})`);
  }
}

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

  join() {
    return this.value;
  }

  chain(f) {
    return this.map(f).join();
  }

  inspect() {
    console.log(`Just(${this.value})`);
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

  join() {
    return Nothing.of();
  }

  chain(f) {
    return Nothing.of();
  }

  inspect() {
    console.log(`Nothing(${this.value})`);
  }
}

// example 7
// join() {
//   return this.value;
// }

// chain(f) {
//   return this.map(f).join();
// }

// example 8 (utilities)
const _map = (fn, functor) => functor.map(fn);
const map = R.curry(_map);
const join = monad => monad.join();
const _chain = (fn, monad) => monad.chain(fn);
const chain = R.curry(_chain);
const trace = monad => {
  monad.inspect();
  return monad;
};

// example 9
const monad = MaybeNumber.of(10);
monad.inspect(); // Maybe(10)
const nestedMonad = map(x => JustNumber.of(x), monad);
nestedMonad.inspect(); // Just(Just(10))
const extractNestedMonad = join(nestedMonad);
extractNestedMonad.inspect(); // Just(10)

// example 10
const chainMonad = chain(x => JustNumber.of(x), monad);
chainMonad.inspect(); // Just(10)

// example 11
const transaction = {
  customer: "Dean Winchester",
  zipcode: 64999,
  item: "Kansas: Greatest Hits",
  promoCode: "promo30",
  price: 15
};

const promo30 = price => price - price * 0.3;
const shipping = price => price + 4.99;
const format = price => price.toFixed(2);
const message = price => `Your total is $${price}`;

// example 12
// simulating an API call
const getTaxRate = zipcode => {
  let result = null;
  if (zipcode) {
    result = 0.065;
  }
  return MaybeNumber.of(result);
};

const _calculateTax = (price, tax) => price + price * tax;
const calculateTax = R.curry(_calculateTax);

// a -> m b
const _applySalesTax = (zipcode, price) => {
  const taxRate = getTaxRate(zipcode);
  return map(calculateTax(price), taxRate);
};
const applySalesTax = R.curry(_applySalesTax);

// example 13
// a -> b
const total = R.compose(
  shipping,
  promo30
);

// a -> b
const createMessage = R.compose(
  message,
  format
);

// example 14
// a -> m b
const handleTransaction = R.compose(
  map(createMessage), // a -> b function, use map
  chain(applySalesTax(transaction.zipcode)), // a -> m b function, use chain
  map(total), // a -> b function, use map
  MaybeNumber.of
);

const result = handleTransaction(transaction.price);
console.log(result); // Just(Your total is $16.50)
