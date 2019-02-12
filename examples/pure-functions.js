// EXAMPLE 1

// number -> number
// functions that take a single number argument and return a single number argument can be linked together
const add5 = num => num + 5;
const multiply2 = num => num * 2;

const result = multiply2(add5(2));
console.log(result); // 14

// number[] -> number[]
// map and filter are both functions that take an array and return an array, thus can be linked as well
const numArray = [1, 2, 3, 4, 5];
const result2 = numArray.map(num => num + 1).filter(num => num % 2 === 0);
console.log(result2); // [2, 4, 6]

// EXAMPLE 2

// add takes 2 arguments, it cannot be composed together with itself as it is currently written
const add = (x, y) => x + y;
const result3 = add(add(5, 6));
console.log(result3); // NaN

// if the second function in the chain take a single parameter, then this will work
const add7 = x => x + 7;
const result4 = add7(add(1, 5));
console.log(result4); // 13

// EXAMPLE3

// the function receives the same input but gives a different output the second time it is called
// relying on state outside the function that can also be mutated by other functions is unpredictable
let counter = 0;
const unsafeAdd = num => counter + num;
const increaseCounter = () => (counter += 5);
console.log(unsafeAdd(1)); // 1
console.log(increaseCounter());
console.log(unsafeAdd(1)); // 6

const user = {
  name: "Spock",
  race: "Vulcan"
};

const users = [];

const addUser = user => users.push(user);
addUser(user);
console.log(users); // [{ name: "Spock", race: "Vulcan" }]

const changeUserName = (name, user) => {
  user.name = name;
};

// the name is changed on the user object, but it is also changed in the array of users
changeUserName("Tuvok", user);
console.log(users); // [{ name: "Tuvok", race: "Vulcan" }]

// with this function we create an entirely new user object and return it
safeChangeUserName = (name, user) => {
  newRecord = Object.assign({}, user);
  newRecord.name = name;
  return newRecord;
};

// the original object and the array of users are unchanged
// we can validate or transform the new information before adding it to the array of users, likely used elsewhere in the program
const newUserChanges = safeChangeUserName("T'Pol", user);
console.log(users); // [{ name: "Tuvok", race: "Vulcan" }]
console.log(user); // { name: "Tuvok", race: "Vulcan" }
console.log(newUserChanges); // { name: "T'Pol", race: "Vulcan" }

// EXAMPLE 4
const userInput = "37";
const isNumber = num => {
  if (typeof num === "number" && num > 0) {
    return num;
  }
  return 0;
};
const dogYears = num => num * 7;
const message = num => {
  if (num !== 0) {
    return `You are ${num} years old in dog years.`;
  }
  return "You either do not exist or entered an invalid age. How sad.";
};

// this works, but it's messy, not very readable, and some of our functions have to go in a particular order or they break
// by the end of this series, we will see a much cleaner, more readable way to produce the same results
const result5 = message(dogYears(isNumber(parseFloat(userInput))));
console.log(result5); // You are 259 years old in dog years.
