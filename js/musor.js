function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  );
}

const pipe = (value, ...funcs) => {
  try {
    for (let func of funcs) {
      if (!isFunction(func)) {
        throw new Error(
          `Provided argument at position ${funcs.indexOf(
            func
          )} is not a function!`
        );
      }
      value = func(value);
    }
  } catch (err) {
    return err;
  }
  return value;
};

const replaceUnderscoreWithSpace = value => value.replace(/_/g, ' ');
const capitalize = value =>
  value
    .split(' ')
    .map(val => val.charAt(0).toUpperCase() + val.slice(1))
    .join(' ');
const appendGreeting = value => `Hello, ${value}!`;

const error = pipe('john_doe', replaceUnderscoreWithSpace, capitalize, '');

alert(error);

const result = pipe(
  'john_doe',
  replaceUnderscoreWithSpace,
  capitalize,
  appendGreeting
);

alert(result);

function countPoints(collection) {
  let points = 0;
  for (let item of collection) {
    let arr = item.split(':'),
      firstItem = Number(arr[0]),
      secondItem = Number(arr[1]);
    if (firstItem > secondItem) {
      points += 3;
    } else if (firstItem < secondItem) {
      continue;
    } else {
      points += 1;
    }
  }
  return points;
}

countPoints([
  '100:90',
  '110:98',
  '100:100',
  '95:46',
  '54:90',
  '99:44',
  '90:90',
  '111:100'
]);

function negativeCount(arr) {
  let counter = 0;
  for (let item of arr) {
    item < 0 ? counter++ : counter;
  }
  return counter;
}
