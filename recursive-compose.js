function isEmpty(array) {
  return array.length === 0;
}

function compose(...fns) {
  const head = fns[0];
  const tail = fns.slice(1);

  if (isEmpty(fns)) {
    return x => x;
  }
  return x => head(compose(...tail)(x));
}

function pipe(...fns) {
  const head = fns[0];
  const tail = fns.slice(1);

  if (isEmpty(fns)) {
    return x => x;
  }
  return x => pipe(...tail)(head(x));
}

function add10(num) {
  return num + 10;
}

function times2(num) {
  return num * 2;
}

function add5(num) {
  return num + 5;
}

const someMath = compose(
  add10,
  times2,
  add5
);

const moarMath = pipe(
  add10,
  times2,
  add5
);

const result1 = someMath(20);
const result2 = moarMath(20);
console.log(result1);
console.log(result2);
