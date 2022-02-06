const regex = new RegExp('(?<=^For example, ).*$', 'gm');
const string = `
Sam's spending was sometimes not the smartest.
For example, he used to buy a new game every week.
Sometimes more.
`;
const results = [];
let currentItem;

while ((currentItem = regex.exec(string)) !== null) {
  results.push(currentItem)
};

// [
//   [
//     'he used to buy a new game every week.',
//     index: 61,
//     input: '\n' +
//       "Sam's spending was sometimes not the smartest.\n" +
//       'For example, he used to buy a new game every week.\n' +
//       'Sometimes more.\n',
//     groups: undefined
//   ]
// ]
console.log(results);