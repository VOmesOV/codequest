import type { Chapter } from '../types/content';

export const chapter07: Chapter = {
  id: 'ch07',
  title: 'Lists and Objects',
  description: 'Holding many values at once — and giving each one a label.',
  icon: '🗂️',
  levels: [
    {
      id: 'ch07-l01',
      title: 'Lists of Things',
      concept: 'An array is one variable holding an ordered list of values.',
      baseXp: 50,
      intro: [
        'So far each variable held one value. A shopping list needs more than that.',
        'An array holds a list, in square brackets:\n\nconst fruits = ["apple", "banana", "cherry"];\n\nOne variable, three values, in a fixed order.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'Which line creates an array of three numbers?',
          options: [
            'const nums = [1, 2, 3];',
            'const nums = (1, 2, 3);',
            'const nums = {1, 2, 3};',
            'const nums = 1, 2, 3;',
          ],
          correctIndex: 0,
          explanation: 'Square brackets, values separated by commas.',
        },
        {
          id: 'q2',
          kind: 'true-false',
          prompt: 'An array keeps its values in a fixed order.',
          answer: true,
          explanation:
            'Order is part of an array. That is what lets you ask for "the third one" and get a reliable answer.',
        },
        {
          id: 'q3',
          kind: 'mcq',
          prompt: 'Can one array hold different kinds of value?',
          options: [
            'Yes — JavaScript allows mixed types in one array',
            'No, never',
            'Only numbers are allowed',
            'Only if they are all text',
          ],
          correctIndex: 0,
          explanation:
            '`[1, "two", true]` is legal. In practice, keeping one array to one kind of thing makes code far easier to reason about.',
        },
        {
          id: 'q4',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'const fruits = ["apple", "banana"];\nconsole.log(fruits);',
          options: ["[ 'apple', 'banana' ]", 'apple banana', 'fruits', '2'],
          correctIndex: 0,
          explanation:
            'Printing the array shows the whole list. Notice the quotes appear — inside a structure, strings are shown with quotes so you can tell text from numbers.',
        },
      ],
    },

    {
      id: 'ch07-l02',
      title: 'Counting From Zero',
      concept: 'Array positions start at 0, not 1.',
      baseXp: 50,
      intro: [
        'To get one value out, use its position in square brackets: `fruits[0]`.',
        'The catch that surprises everyone: counting starts at **zero**. The first item is `[0]`, the second is `[1]`, the third is `[2]`.',
        'So for a list of 3 items, the last valid position is 2. Ask for `[3]` and you get `undefined` — not an error, just nothing.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'const fruits = ["apple", "banana", "cherry"];\nconsole.log(fruits[0]);',
          options: ['apple', 'banana', '0', 'undefined'],
          correctIndex: 0,
          explanation: 'Position 0 is the first item.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'Careful with the counting.',
          code: 'const fruits = ["apple", "banana", "cherry"];\nconsole.log(fruits[2]);',
          options: ['cherry', 'banana', 'apple', 'undefined'],
          correctIndex: 0,
          explanation: '0 is apple, 1 is banana, 2 is cherry. The third item lives at position 2.',
          hints: ['Count the positions starting from 0, not 1.'],
        },
        {
          id: 'q3',
          kind: 'predict-output',
          prompt: 'This position does not exist.',
          code: 'const fruits = ["apple", "banana"];\nconsole.log(fruits[5]);',
          options: ['undefined', 'An error', 'banana', 'null'],
          correctIndex: 0,
          explanation:
            'JavaScript does not complain — it quietly hands back `undefined`. That silence is why an off-by-one mistake can slip a long way before you notice.',
        },
        {
          id: 'q4',
          kind: 'fill-blank',
          prompt: 'Print the second item of the list.',
          template: 'const colors = ["red", "green", "blue"];\nconsole.log(colors[{{0}}]);',
          blanks: [{ choices: ['1', '2', '0', '3'], correctIndex: 0 }],
          explanation: 'Second item, position 1. Position = counting number minus one.',
        },
      ],
    },

    {
      id: 'ch07-l03',
      title: 'How Long Is It?',
      concept: '`.length` gives the number of items.',
      baseXp: 50,
      intro: [
        '`fruits.length` gives how many items the array holds. It counts normally, starting at 1 — so a 3-item array has a length of 3.',
        'Because positions start at 0, the last item is always at `length - 1`. That little subtraction appears constantly.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'const nums = [10, 20, 30, 40];\nconsole.log(nums.length);',
          options: ['4', '3', '40', '0'],
          correctIndex: 0,
          explanation: 'Four items, so length is 4 — even though the last position is 3.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'Getting the last item without knowing the size in advance.',
          code: 'const nums = [10, 20, 30];\nconsole.log(nums[nums.length - 1]);',
          options: ['30', '20', 'undefined', '3'],
          correctIndex: 0,
          explanation:
            'Length is 3, so `3 - 1` is position 2 — the last item. This works no matter how many items there are.',
          hints: ['Work out `nums.length` first, then subtract 1, then look up that position.'],
        },
        {
          id: 'q3',
          kind: 'mcq',
          prompt: 'An array has 7 items. What is the position of the last one?',
          options: ['6', '7', '8', '0'],
          correctIndex: 0,
          explanation: 'Always `length - 1`. Reaching for `[7]` here would give `undefined`.',
        },
        {
          id: 'q4',
          kind: 'code',
          prompt:
            'Write `lastItem(list)` that returns the final item of any array it is given.',
          starterCode: 'function lastItem(list) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'lastItem', args: [[1, 2, 3]], expected: 3 },
            { type: 'function', name: 'lastItem', args: [['a', 'b']], expected: 'b' },
            { type: 'function', name: 'lastItem', args: [[42]], expected: 42 },
          ],
          solution: 'function lastItem(list) {\n  return list[list.length - 1];\n}',
          explanation:
            'Writing `list[2]` would have passed the first test and failed the others. Using `length - 1` makes it work for any array.',
          hints: ['The last position is `list.length - 1`.'],
        },
      ],
    },

    {
      id: 'ch07-l04',
      title: 'Changing a List',
      concept: 'Add with `push`, replace by position.',
      baseXp: 50,
      intro: [
        '`fruits.push("mango")` adds an item to the end. `fruits[0] = "pear"` replaces whatever was at position 0.',
        'Both work even on a `const` array. `const` stops you pointing the name at a *different* array; it does not freeze the contents.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'const nums = [1, 2];\nnums.push(3);\nconsole.log(nums.length);',
          options: ['3', '2', '4', '1'],
          correctIndex: 0,
          explanation: '`push` adds to the end, so the array now holds three items.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'Replacing an item.',
          code: 'const colors = ["red", "green"];\ncolors[0] = "blue";\nconsole.log(colors[0]);',
          options: ['blue', 'red', 'green', 'undefined'],
          correctIndex: 0,
          explanation: 'Assigning to a position overwrites what was there, exactly like a variable.',
        },
        {
          id: 'q3',
          kind: 'true-false',
          prompt: 'You can add items to an array declared with `const`.',
          answer: true,
          explanation:
            '`const` protects the name, not the contents. `nums.push(4)` is fine; `nums = [9]` is not.',
        },
        {
          id: 'q4',
          kind: 'fill-blank',
          prompt: 'Add `"cherry"` to the end of the list.',
          template: 'const fruits = ["apple"];\nfruits.{{0}}("cherry");',
          blanks: [{ choices: ['push', 'add', 'append', 'insert'], correctIndex: 0 }],
          explanation: 'JavaScript calls it `push`. Other languages say `append` — same idea, different word.',
        },
      ],
    },

    {
      id: 'ch07-l05',
      title: 'Looping Over a List',
      concept: 'Visit every item with a loop.',
      baseXp: 50,
      intro: [
        'Combining a loop with an array is where things get powerful:\n\nfor (let i = 0; i < list.length; i = i + 1) {\n    console.log(list[i]);\n}',
        'Start at 0, stop *before* `length`, and use `i` as the position. That header is worth memorising — you will type it hundreds of times.',
        'JavaScript also has a shorter version: `for (const item of list)`, which hands you each item directly.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'How many lines does this print?',
          code: 'const list = ["a", "b", "c"];\nfor (let i = 0; i < list.length; i = i + 1) {\n  console.log(list[i]);\n}',
          options: ['3 lines: a, b, c', '2 lines', '4 lines', 'Nothing'],
          correctIndex: 0,
          explanation:
            'i is 0, 1, 2 — every valid position, and no more. `< length` rather than `<= length` is what keeps it in bounds.',
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt: 'Why `i < list.length` and not `i <= list.length`?',
          options: [
            'Because the last valid position is length - 1',
            'Because `<=` is not allowed in loops',
            'Because arrays cannot be counted',
            'There is no difference',
          ],
          correctIndex: 0,
          explanation:
            'With `<=` the loop would run one pass too many and read `undefined` off the end.',
        },
        {
          id: 'q3',
          kind: 'code',
          prompt: 'Write `sumArray(list)` that returns the total of all the numbers in the array.',
          starterCode: 'function sumArray(list) {\n  let total = 0;\n  \n}\n',
          tests: [
            { type: 'function', name: 'sumArray', args: [[1, 2, 3]], expected: 6 },
            { type: 'function', name: 'sumArray', args: [[10, 20, 30, 40]], expected: 100 },
            { type: 'function', name: 'sumArray', args: [[]], expected: 0 },
          ],
          solution:
            'function sumArray(list) {\n  let total = 0;\n  for (let i = 0; i < list.length; i = i + 1) {\n    total = total + list[i];\n  }\n  return total;\n}',
          explanation:
            'The running-total pattern from chapter 5, now over a list. The empty-array test passes for free: the loop runs zero times and `total` is still 0.',
          hints: [
            'Loop from 0 while `i < list.length`.',
            'Add `list[i]` to the total on each pass, and return after the loop.',
          ],
        },
        {
          id: 'q4',
          kind: 'code',
          prompt:
            'Write `countAbove(list, limit)` returning how many numbers in the list are strictly greater than `limit`.',
          starterCode: 'function countAbove(list, limit) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'countAbove', args: [[1, 5, 9], 4], expected: 2 },
            { type: 'function', name: 'countAbove', args: [[1, 2, 3], 10], expected: 0 },
            { type: 'function', name: 'countAbove', args: [[7, 7, 7], 6], expected: 3 },
          ],
          solution:
            'function countAbove(list, limit) {\n  let count = 0;\n  for (let i = 0; i < list.length; i = i + 1) {\n    if (list[i] > limit) {\n      count = count + 1;\n    }\n  }\n  return count;\n}',
          explanation:
            'Loop, condition, counter — three ideas from three different chapters working together. This is what "learning to program" actually looks like.',
          hints: ['"Strictly greater" means `>`, not `>=`.'],
        },
      ],
    },

    {
      id: 'ch07-l06',
      title: 'Objects',
      concept: 'An object stores labelled values.',
      baseXp: 50,
      intro: [
        'Arrays are numbered. Objects are labelled:\n\nconst person = {\n    name: "Alex",\n    age: 25\n};',
        'Each entry has a key (the label) and a value. Read one with a dot: `person.name`.',
        'Use an array for "many of the same thing", and an object for "one thing with several attributes".',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'const person = { name: "Alex", age: 25 };\nconsole.log(person.name);',
          options: ['Alex', 'name', '25', 'undefined'],
          correctIndex: 0,
          explanation: '`person.name` reads the value stored under the key `name`.',
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt: 'When is an object a better fit than an array?',
          options: [
            'When one thing has several named attributes',
            'When you have a numbered list of similar things',
            'When you need to count items',
            'Objects are always better',
          ],
          correctIndex: 0,
          explanation:
            'A person has a name, an age and an email — labels, not positions. A guest list, on the other hand, is an array of people.',
        },
        {
          id: 'q3',
          kind: 'predict-output',
          prompt: 'That key does not exist.',
          code: 'const person = { name: "Alex" };\nconsole.log(person.age);',
          options: ['undefined', 'An error', 'null', '0'],
          correctIndex: 0,
          explanation:
            'Same quiet `undefined` as a missing array position. JavaScript tells you nothing is there rather than complaining.',
        },
        {
          id: 'q4',
          kind: 'fill-blank',
          prompt: 'Create an object with a `city` of `"Tokyo"` and print it.',
          template: 'const place = {{{0}} "Tokyo" };\nconsole.log(place{{1}}city);',
          blanks: [
            { choices: ['city:', 'city =', '"city"', 'city'], correctIndex: 0 },
            { choices: ['.', '->', '::', ','], correctIndex: 0 },
          ],
          explanation: 'A colon separates key from value inside the braces; a dot reads it back out.',
        },
      ],
    },

    {
      id: 'ch07-l07',
      title: 'Working With Objects',
      concept: 'Read, change and return values from objects.',
      baseXp: 50,
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'const car = { brand: "Honda", year: 2020 };\ncar.year = 2024;\nconsole.log(car.year);',
          options: ['2024', '2020', 'undefined', 'An error'],
          correctIndex: 0,
          explanation:
            'Properties are assigned exactly like variables. And as with arrays, `const` does not stop this.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'Adding a brand new key.',
          code: 'const car = { brand: "Honda" };\ncar.color = "red";\nconsole.log(car.color);',
          options: ['red', 'undefined', 'An error', 'Honda'],
          correctIndex: 0,
          explanation:
            'Assigning to a key that does not exist yet creates it. Objects grow as you go.',
        },
        {
          id: 'q3',
          kind: 'code',
          prompt:
            'Write `describePerson(person)` that returns a sentence like `"Alex is 25"` from an object with `name` and `age`.',
          starterCode: 'function describePerson(person) {\n  \n}\n',
          tests: [
            {
              type: 'function',
              name: 'describePerson',
              args: [{ name: 'Alex', age: 25 }],
              expected: 'Alex is 25',
            },
            {
              type: 'function',
              name: 'describePerson',
              args: [{ name: 'Mia', age: 7 }],
              expected: 'Mia is 7',
            },
          ],
          solution:
            'function describePerson(person) {\n  return `${person.name} is ${person.age}`;\n}',
          explanation:
            'Objects travel as a single value, so one parameter carries both pieces of data. Imagine passing ten separate arguments instead.',
          hints: ['Read both values with a dot, and join them with a template string.'],
        },
        {
          id: 'q4',
          kind: 'code',
          prompt:
            'Write `haveBirthday(person)` that adds 1 to the person\'s `age` and returns the updated object.',
          starterCode: 'function haveBirthday(person) {\n  \n}\n',
          tests: [
            {
              type: 'function',
              name: 'haveBirthday',
              args: [{ name: 'Alex', age: 25 }],
              expected: { name: 'Alex', age: 26 },
            },
            {
              type: 'function',
              name: 'haveBirthday',
              args: [{ name: 'Mia', age: 9 }],
              expected: { name: 'Mia', age: 10 },
            },
          ],
          solution:
            'function haveBirthday(person) {\n  person.age = person.age + 1;\n  return person;\n}',
          explanation:
            'The whole object comes back with one property changed. The test compares every key, so the name has to survive untouched.',
          hints: ['Change `person.age`, then return `person` itself.'],
        },
      ],
    },

    {
      id: 'ch07-l08',
      title: 'Lists of Objects',
      concept: 'Real data is usually an array of objects.',
      baseXp: 50,
      intro: [
        'Put the two together and you have the shape of nearly all real data:\n\nconst people = [\n    { name: "Alex", age: 25 },\n    { name: "Mia", age: 30 }\n];',
        'Reach an item by position, then a property by name: `people[1].name` is `"Mia"`.',
        'Every product list, every message thread, every search result you have ever seen arrived in roughly this shape.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'const people = [\n  { name: "Alex", age: 25 },\n  { name: "Mia", age: 30 }\n];\nconsole.log(people[1].name);',
          options: ['Mia', 'Alex', '30', 'undefined'],
          correctIndex: 0,
          explanation: 'Position 1 is the second object; `.name` reads its label.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'Looping over objects.',
          code: 'const items = [\n  { label: "pen", price: 10 },\n  { label: "book", price: 50 }\n];\nlet total = 0;\nfor (let i = 0; i < items.length; i = i + 1) {\n  total = total + items[i].price;\n}\nconsole.log(total);',
          options: ['60', '10', '50', '2'],
          correctIndex: 0,
          explanation:
            '10 + 50. `items[i]` gives an object; `.price` pulls the number out of it.',
          hints: ['`items[i]` is an object — you still need `.price` to get the number.'],
        },
        {
          id: 'q3',
          kind: 'fill-blank',
          prompt: 'Print the age of the first person in the list.',
          template: 'const people = [{ name: "Alex", age: 25 }];\nconsole.log(people[{{0}}]{{1}}age);',
          blanks: [
            { choices: ['0', '1', '2', '-1'], correctIndex: 0 },
            { choices: ['.', ',', ':', '->'], correctIndex: 0 },
          ],
          explanation: 'Position first, then the dot for the property.',
        },
        {
          id: 'q4',
          kind: 'code',
          prompt:
            'Write `totalPrice(items)` returning the sum of every item\'s `price`.',
          starterCode: 'function totalPrice(items) {\n  \n}\n',
          tests: [
            {
              type: 'function',
              name: 'totalPrice',
              args: [[{ price: 10 }, { price: 50 }]],
              expected: 60,
            },
            {
              type: 'function',
              name: 'totalPrice',
              args: [[{ price: 5 }, { price: 5 }, { price: 5 }]],
              expected: 15,
            },
            { type: 'function', name: 'totalPrice', args: [[]], expected: 0 },
          ],
          solution:
            'function totalPrice(items) {\n  let total = 0;\n  for (let i = 0; i < items.length; i = i + 1) {\n    total = total + items[i].price;\n  }\n  return total;\n}',
          explanation:
            'This is a shopping cart total. You have just written something that exists, in some form, in essentially every online shop.',
          hints: ['Same running-total loop — just reach for `.price` on each item.'],
        },
      ],
    },

    {
      id: 'ch07-l09',
      title: 'Boss: Data Wrangler',
      concept: 'Arrays, objects and loops on realistic data.',
      boss: true,
      baseXp: 150,
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'const nums = [4, 8, 15];\nconsole.log(nums[1] + nums.length);',
          options: ['11', '8', '12', '19'],
          correctIndex: 0,
          explanation: '`nums[1]` is 8, length is 3, so 8 + 3 = 11.',
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt: 'Which gets the last item of any array `list`?',
          options: [
            'list[list.length - 1]',
            'list[list.length]',
            'list.last',
            'list[-1]',
          ],
          correctIndex: 0,
          explanation:
            '`list[list.length]` runs one past the end, and `list[-1]` is not a position that exists in JavaScript.',
        },
        {
          id: 'q3',
          kind: 'code',
          prompt:
            'Write `findOldest(people)` that returns the `name` of the person with the highest `age`.',
          starterCode: 'function findOldest(people) {\n  \n}\n',
          tests: [
            {
              type: 'function',
              name: 'findOldest',
              args: [
                [
                  { name: 'Alex', age: 25 },
                  { name: 'Mia', age: 40 },
                  { name: 'Sam', age: 31 },
                ],
              ],
              expected: 'Mia',
            },
            {
              type: 'function',
              name: 'findOldest',
              args: [
                [
                  { name: 'Ann', age: 60 },
                  { name: 'Bo', age: 12 },
                ],
              ],
              expected: 'Ann',
            },
          ],
          solution:
            'function findOldest(people) {\n  let oldest = people[0];\n  for (let i = 1; i < people.length; i = i + 1) {\n    if (people[i].age > oldest.age) {\n      oldest = people[i];\n    }\n  }\n  return oldest.name;\n}',
          explanation:
            'Assume the first is the winner, then replace it whenever you find better. This "keep the best so far" pattern works for the largest, the smallest, the cheapest — anything.',
          hints: [
            'Start by assuming `people[0]` is the oldest.',
            'Compare each remaining person against your current best, and return the name at the end.',
          ],
        },
        {
          id: 'q4',
          kind: 'code',
          prompt:
            'Write `namesOnly(people)` that returns an array of just the names.',
          starterCode: 'function namesOnly(people) {\n  const names = [];\n  \n}\n',
          tests: [
            {
              type: 'function',
              name: 'namesOnly',
              args: [[{ name: 'Alex' }, { name: 'Mia' }]],
              expected: ['Alex', 'Mia'],
            },
            { type: 'function', name: 'namesOnly', args: [[]], expected: [] },
          ],
          solution:
            'function namesOnly(people) {\n  const names = [];\n  for (let i = 0; i < people.length; i = i + 1) {\n    names.push(people[i].name);\n  }\n  return names;\n}',
          explanation:
            'Building a new array as you go, instead of a number. Start empty, `push` on each pass, return at the end.',
          hints: ['`names.push(...)` adds to the end.', 'Return `names` after the loop.'],
        },
        {
          id: 'q5',
          kind: 'code',
          prompt:
            'Write `averageScore(scores)` returning the average of the numbers. For an empty array return 0.',
          starterCode: 'function averageScore(scores) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'averageScore', args: [[10, 20, 30]], expected: 20 },
            { type: 'function', name: 'averageScore', args: [[5, 5]], expected: 5 },
            { type: 'function', name: 'averageScore', args: [[]], expected: 0 },
          ],
          solution:
            'function averageScore(scores) {\n  if (scores.length === 0) {\n    return 0;\n  }\n  let total = 0;\n  for (let i = 0; i < scores.length; i = i + 1) {\n    total = total + scores[i];\n  }\n  return total / scores.length;\n}',
          explanation:
            'The empty case needs its own guard — dividing by zero would give `NaN`, "not a number". Handling the empty case first is a habit that prevents a whole family of bugs.',
          hints: [
            'Check for an empty array before dividing.',
            'Average is the total divided by how many there are.',
          ],
        },
      ],
    },
  ],
};
