import type { Chapter } from '../types/content';

export const chapter08: Chapter = {
  id: 'ch08',
  title: 'Debugging and Projects',
  description: 'Find bugs on purpose, then build small programs end to end.',
  icon: '🔧',
  levels: [
    {
      id: 'ch08-l01',
      title: 'Reading Error Messages',
      concept: 'An error message tells you what and where — read it, do not fear it.',
      baseXp: 50,
      intro: [
        'Errors are not punishment. They are the most useful message your computer will ever send you: it noticed a problem and is telling you roughly where.',
        'A typical one: `ReferenceError: total is not defined`. The type of problem, and the thing that caused it. Read the last line first — it is usually the one that matters.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'What does `ReferenceError: total is not defined` mean?',
          options: [
            'You used a variable called `total` that was never created',
            'The number is too large',
            'You forgot a semicolon',
            'The program ran out of memory',
          ],
          correctIndex: 0,
          explanation:
            'Usually a typo in the name, or using a variable before the line that creates it.',
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt: 'What usually causes `SyntaxError: Unexpected end of input`?',
          options: [
            'A missing closing bracket — `}` or `)`',
            'A number divided by zero',
            'Too many variables',
            'A slow internet connection',
          ],
          correctIndex: 0,
          explanation:
            'JavaScript reached the end of the file still waiting for something to be closed. Check that every opening bracket has a partner.',
        },
        {
          id: 'q3',
          kind: 'mcq',
          prompt: '`TypeError: x is not a function` — what happened?',
          options: [
            'You called something with `()` that is not a function',
            'The variable has the wrong name',
            'You used the wrong number of loops',
            'A string was too long',
          ],
          correctIndex: 0,
          explanation:
            'Often a spelling slip, like `console.logg(...)` or `list.puhs(...)`.',
        },
        {
          id: 'q4',
          kind: 'true-false',
          prompt: 'An error message is worth reading before you change anything.',
          answer: true,
          explanation:
            'Beginners tend to panic and start editing at random. Reading the message first usually points at the exact line.',
        },
      ],
    },

    {
      id: 'ch08-l02',
      title: 'Typos and Capital Letters',
      concept: 'JavaScript is case-sensitive and unforgiving about spelling.',
      baseXp: 50,
      intro: [
        '`myName` and `myname` are two completely different variables. JavaScript will not warn you that you probably meant the other one.',
        'Every programmer loses time to this. What separates a beginner from an experienced developer is only how fast they spot it.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'What is wrong here?',
          code: 'let userName = "Alex";\nconsole.log(username);',
          options: [
            'The capital N is missing on line 2 — it is a different name',
            'Strings cannot be printed',
            '`let` should be `const`',
            'Nothing is wrong',
          ],
          correctIndex: 0,
          explanation:
            '`userName` and `username` are unrelated. This gives `ReferenceError: username is not defined`.',
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt: 'Spot the mistake.',
          code: 'const nums = [1, 2, 3];\nconsole.log(nums.lenght);',
          options: [
            '`lenght` is misspelled — it should be `length`',
            'Arrays have no length',
            'The array needs more items',
            '`console.log` cannot print numbers',
          ],
          correctIndex: 0,
          explanation:
            'And notice it prints `undefined` rather than erroring — a misspelled property is silent, which makes it nastier than a crash.',
        },
        {
          id: 'q3',
          kind: 'code',
          prompt: 'Fix the three typos so this prints `Hello, Alex`.',
          starterCode: 'const Name = "Alex";\nconsole.Log("Hello, " + name);\n',
          tests: [{ type: 'output', expectedLogs: ['Hello, Alex'], description: 'Prints Hello, Alex' }],
          solution: 'const name = "Alex";\nconsole.log("Hello, " + name);',
          explanation:
            'Capital `L` in `console.Log`, and a name declared as `Name` but used as `name`. Consistent lower-case-first naming is the convention precisely because it removes this whole category of mistake.',
          hints: [
            '`console.Log` is not the same as `console.log`.',
            'Make the declaration and the usage agree on capitalisation.',
          ],
        },
        {
          id: 'q4',
          kind: 'code',
          prompt: 'This has a missing bracket. Fix it so it prints 1, 2, 3.',
          starterCode: 'for (let i = 1; i <= 3; i = i + 1) {\n  console.log(i);\n',
          tests: [{ type: 'output', expectedLogs: ['1', '2', '3'], description: 'Prints 1, 2, 3' }],
          solution: 'for (let i = 1; i <= 3; i = i + 1) {\n  console.log(i);\n}',
          explanation:
            'One `}` was missing at the end. Consistent indentation is how you spot these at a glance: the block is open, so something must close it.',
          hints: ['Count the opening and closing curly brackets.'],
        },
      ],
    },

    {
      id: 'ch08-l03',
      title: 'Bugs That Do Not Crash',
      concept: 'The worst bugs run happily and give the wrong answer.',
      baseXp: 50,
      intro: [
        'A crash is the easy case — the program points at the problem. The hard case is code that runs fine and produces a wrong number.',
        'The technique: check the values at each step. `console.log` inside a loop is a perfectly respectable debugging tool.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt:
            'This is meant to add 1, 2 and 3 to get 6. What does it actually print?',
          code: 'const nums = [1, 2, 3];\nlet total = 0;\nfor (let i = 0; i < nums.length; i = i + 1) {\n  total = nums[i];\n}\nconsole.log(total);',
          options: ['3', '6', '0', '1'],
          correctIndex: 0,
          explanation:
            '`total = nums[i]` replaces instead of adding, so only the last value survives. One missing `total +` between working and broken.',
          hints: ['Is the old value of `total` used at all on that line?'],
        },
        {
          id: 'q2',
          kind: 'code',
          prompt: 'Fix the sum so `sumArray([1, 2, 3])` returns 6.',
          starterCode:
            'function sumArray(list) {\n  let total = 0;\n  for (let i = 0; i < list.length; i = i + 1) {\n    total = list[i];\n  }\n  return total;\n}\n',
          tests: [
            { type: 'function', name: 'sumArray', args: [[1, 2, 3]], expected: 6 },
            { type: 'function', name: 'sumArray', args: [[10, 5]], expected: 15 },
          ],
          solution:
            'function sumArray(list) {\n  let total = 0;\n  for (let i = 0; i < list.length; i = i + 1) {\n    total = total + list[i];\n  }\n  return total;\n}',
          explanation:
            'Two characters. Bugs are very often this small, which is exactly why reading carefully beats rewriting.',
          hints: ['The running total has to include what was already in it.'],
        },
        {
          id: 'q3',
          kind: 'code',
          prompt:
            'This should return `true` only for numbers above 100. Fix it.',
          starterCode: 'function isBig(n) {\n  if (n > 100) {\n    return true;\n  }\n}\n',
          tests: [
            { type: 'function', name: 'isBig', args: [150], expected: true },
            { type: 'function', name: 'isBig', args: [50], expected: false },
            { type: 'function', name: 'isBig', args: [100], expected: false },
          ],
          solution:
            'function isBig(n) {\n  if (n > 100) {\n    return true;\n  }\n  return false;\n}',
          explanation:
            'Without the second `return`, small numbers gave `undefined` instead of `false`. `undefined` behaves like false in an `if`, so this bug can hide for a long time.',
          hints: ['What comes back when the `if` does not match?'],
        },
      ],
    },

    {
      id: 'ch08-l04',
      title: 'Off By One',
      concept: 'The classic boundary mistake, and how to catch it.',
      baseXp: 50,
      intro: [
        'Off-by-one: the loop runs one time too many or too few, or a boundary uses `>` where it needed `>=`.',
        'The cure is to test the edges deliberately. If a rule says "18 or over", test 17, 18 and 19 — the bug, if there is one, lives at exactly 18.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'This is meant to print all three items. What actually happens?',
          code: 'const list = ["a", "b", "c"];\nfor (let i = 0; i <= list.length; i = i + 1) {\n  console.log(list[i]);\n}',
          options: [
            'a, b, c, then undefined',
            'a, b, c',
            'a, b',
            'An error',
          ],
          correctIndex: 0,
          explanation:
            '`<=` gives a fourth pass at position 3, which does not exist — so `undefined` prints. Use `<` with `.length`.',
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt:
            'A rule says "members are 18 or older". Which values should you test?',
          options: ['17, 18 and 19', 'Only 25', 'Only 0', '100 and 200'],
          correctIndex: 0,
          explanation:
            'Just below, exactly on, just above. Testing 25 would pass with either `>` or `>=` and tell you nothing.',
        },
        {
          id: 'q3',
          kind: 'code',
          prompt:
            'Fix this so it prints exactly 1 to 5 — no 0, no 6.',
          starterCode: 'for (let i = 0; i <= 6; i = i + 1) {\n  console.log(i);\n}\n',
          tests: [
            { type: 'output', expectedLogs: ['1', '2', '3', '4', '5'], description: 'Prints 1 to 5' },
          ],
          solution: 'for (let i = 1; i <= 5; i = i + 1) {\n  console.log(i);\n}',
          explanation:
            'Both ends were wrong. Start and stop values deserve the same attention as the logic between them.',
          hints: ['Look at where it starts as well as where it stops.'],
        },
        {
          id: 'q4',
          kind: 'code',
          prompt:
            'Fix `canEnter(age)` so that exactly 18 is allowed in.',
          starterCode: 'function canEnter(age) {\n  return age > 18;\n}\n',
          tests: [
            { type: 'function', name: 'canEnter', args: [18], expected: true },
            { type: 'function', name: 'canEnter', args: [17], expected: false },
            { type: 'function', name: 'canEnter', args: [40], expected: true },
          ],
          solution: 'function canEnter(age) {\n  return age >= 18;\n}',
          explanation:
            'One character. This exact bug has shipped in real products and turned away real people on their birthday.',
          hints: ['"18 or older" includes 18 itself.'],
        },
      ],
    },

    {
      id: 'ch08-l05',
      title: 'Project: Guessing Game Checker',
      concept: 'Build the logic behind a real game.',
      baseXp: 50,
      intro: [
        'Time to build things. Each of the next levels is a small but complete piece of a real program.',
        'You have every tool you need: variables, conditions, loops, functions, arrays and objects.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'code',
          prompt:
            'Write `checkGuess(guess, secret)` returning `"too low"`, `"too high"` or `"correct"`.',
          starterCode: 'function checkGuess(guess, secret) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'checkGuess', args: [5, 10], expected: 'too low' },
            { type: 'function', name: 'checkGuess', args: [15, 10], expected: 'too high' },
            { type: 'function', name: 'checkGuess', args: [10, 10], expected: 'correct' },
          ],
          solution:
            'function checkGuess(guess, secret) {\n  if (guess < secret) {\n    return "too low";\n  } else if (guess > secret) {\n    return "too high";\n  }\n  return "correct";\n}',
          explanation:
            'Three outcomes, so two comparisons: if it is neither below nor above, it must be equal. That is the entire brain of a guessing game.',
          hints: ['Handle "below" and "above" first; anything left over is correct.'],
        },
        {
          id: 'q2',
          kind: 'code',
          prompt:
            'Write `attemptsNeeded(secret)` that counts up from 1 and returns how many guesses it takes to reach `secret`.',
          starterCode: 'function attemptsNeeded(secret) {\n  let guess = 1;\n  let attempts = 0;\n  \n}\n',
          tests: [
            { type: 'function', name: 'attemptsNeeded', args: [1], expected: 1 },
            { type: 'function', name: 'attemptsNeeded', args: [5], expected: 5 },
            { type: 'function', name: 'attemptsNeeded', args: [12], expected: 12 },
          ],
          solution:
            'function attemptsNeeded(secret) {\n  let guess = 1;\n  let attempts = 0;\n  while (guess <= secret) {\n    attempts = attempts + 1;\n    guess = guess + 1;\n  }\n  return attempts;\n}',
          explanation:
            'A `while` loop with a counter. Make sure something inside moves `guess` towards the end — otherwise the 2-second timeout will let you know.',
          hints: [
            'Loop while the guess has not passed the secret.',
            'Count one attempt per pass, and move the guess forward.',
          ],
        },
        {
          id: 'q3',
          kind: 'code',
          prompt:
            'Write `isInRange(n, low, high)` returning `true` when `n` is between `low` and `high` inclusive.',
          starterCode: 'function isInRange(n, low, high) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'isInRange', args: [5, 1, 10], expected: true },
            { type: 'function', name: 'isInRange', args: [1, 1, 10], expected: true },
            { type: 'function', name: 'isInRange', args: [10, 1, 10], expected: true },
            { type: 'function', name: 'isInRange', args: [11, 1, 10], expected: false },
          ],
          solution:
            'function isInRange(n, low, high) {\n  return n >= low && n <= high;\n}',
          explanation:
            '"Inclusive" means both ends count, so `>=` and `<=`. Both boundaries are tested here on purpose.',
          hints: ['Two comparisons joined with `&&`.'],
        },
      ],
    },

    {
      id: 'ch08-l06',
      title: 'Project: Shopping Cart',
      concept: 'Work with realistic data: arrays of objects, quantities, totals.',
      baseXp: 50,
      questions: [
        {
          id: 'q1',
          kind: 'code',
          prompt:
            'Write `cartTotal(items)` where each item has a `price` and a `qty`. Return the total cost.',
          starterCode: 'function cartTotal(items) {\n  \n}\n',
          tests: [
            {
              type: 'function',
              name: 'cartTotal',
              args: [
                [
                  { price: 10, qty: 2 },
                  { price: 5, qty: 3 },
                ],
              ],
              expected: 35,
            },
            {
              type: 'function',
              name: 'cartTotal',
              args: [[{ price: 100, qty: 1 }]],
              expected: 100,
            },
            { type: 'function', name: 'cartTotal', args: [[]], expected: 0 },
          ],
          solution:
            'function cartTotal(items) {\n  let total = 0;\n  for (let i = 0; i < items.length; i = i + 1) {\n    total = total + items[i].price * items[i].qty;\n  }\n  return total;\n}',
          explanation:
            '(10 × 2) + (5 × 3) = 35. Multiply before adding — this is a real shopping cart calculation.',
          hints: ['Each item contributes `price * qty` to the total.'],
        },
        {
          id: 'q2',
          kind: 'code',
          prompt:
            'Write `itemCount(items)` returning the total number of things in the cart (add up every `qty`).',
          starterCode: 'function itemCount(items) {\n  \n}\n',
          tests: [
            {
              type: 'function',
              name: 'itemCount',
              args: [
                [
                  { price: 10, qty: 2 },
                  { price: 5, qty: 3 },
                ],
              ],
              expected: 5,
            },
            { type: 'function', name: 'itemCount', args: [[]], expected: 0 },
          ],
          solution:
            'function itemCount(items) {\n  let count = 0;\n  for (let i = 0; i < items.length; i = i + 1) {\n    count = count + items[i].qty;\n  }\n  return count;\n}',
          explanation:
            'Two items in the cart, five things in the bag. A real shop needs both numbers, for different reasons.',
          hints: ['Add up `qty`, not 1, on each pass.'],
        },
        {
          id: 'q3',
          kind: 'code',
          prompt:
            'Write `applyShipping(total)`: free over 500, otherwise add 50. Return the final amount.',
          starterCode: 'function applyShipping(total) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'applyShipping', args: [600], expected: 600 },
            { type: 'function', name: 'applyShipping', args: [500], expected: 550 },
            { type: 'function', name: 'applyShipping', args: [100], expected: 150 },
          ],
          solution:
            'function applyShipping(total) {\n  if (total > 500) {\n    return total;\n  }\n  return total + 50;\n}',
          explanation:
            'Read the rule precisely: "free over 500" means strictly above, so exactly 500 still pays. The test for 500 is there to catch anyone who assumed otherwise.',
          hints: ['"Over 500" is `> 500`, not `>= 500`. Check the test for exactly 500.'],
        },
      ],
    },

    {
      id: 'ch08-l07',
      title: 'Project: Text Statistics',
      concept: 'Take text apart and measure it.',
      baseXp: 50,
      intro: [
        'Two new tools for working with text.',
        '`"a b c".split(" ")` cuts a string into an array wherever it finds a space, giving `["a", "b", "c"]`.',
        '`"hello".length` works on strings too — it counts characters. Same property name as arrays, same meaning: how many.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'const words = "one two three".split(" ");\nconsole.log(words.length);',
          options: ['3', '13', '1', '2'],
          correctIndex: 0,
          explanation: 'Split on spaces gives three pieces, so the array length is 3.',
        },
        {
          id: 'q2',
          kind: 'code',
          prompt: 'Write `wordCount(sentence)` returning how many words it has.',
          starterCode: 'function wordCount(sentence) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'wordCount', args: ['hello world'], expected: 2 },
            { type: 'function', name: 'wordCount', args: ['one two three four'], expected: 4 },
            { type: 'function', name: 'wordCount', args: ['single'], expected: 1 },
          ],
          solution:
            'function wordCount(sentence) {\n  return sentence.split(" ").length;\n}',
          explanation:
            'Split, then count. You can chain them on one line because `split` hands back an array immediately.',
          hints: ['Split on a space, then ask the result for its `.length`.'],
        },
        {
          id: 'q3',
          kind: 'code',
          prompt:
            'Write `longestWord(sentence)` returning the longest word. If two tie, return the first one.',
          starterCode: 'function longestWord(sentence) {\n  const words = sentence.split(" ");\n  \n}\n',
          tests: [
            { type: 'function', name: 'longestWord', args: ['I love programming'], expected: 'programming' },
            { type: 'function', name: 'longestWord', args: ['a bb ccc'], expected: 'ccc' },
            { type: 'function', name: 'longestWord', args: ['one two'], expected: 'one' },
          ],
          solution:
            'function longestWord(sentence) {\n  const words = sentence.split(" ");\n  let longest = words[0];\n  for (let i = 1; i < words.length; i = i + 1) {\n    if (words[i].length > longest.length) {\n      longest = words[i];\n    }\n  }\n  return longest;\n}',
          explanation:
            'The "best so far" pattern again, now measuring by length. Using `>` rather than `>=` is what makes the first of a tie win — "one" and "two" are both 3 letters, and "one" keeps the title.',
          hints: [
            'Start by assuming the first word is longest.',
            'Use `>` so an equally long word does not replace the earlier one.',
          ],
        },
      ],
    },

    {
      id: 'ch08-l08',
      title: 'Final Boss: The Whole Journey',
      concept: 'Everything, from sequencing to real programs.',
      boss: true,
      baseXp: 250,
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'function mystery(n) {\n  let result = 0;\n  for (let i = 1; i <= n; i = i + 1) {\n    if (i % 2 === 1) {\n      result = result + i;\n    }\n  }\n  return result;\n}\nconsole.log(mystery(5));',
          options: ['9', '15', '6', '5'],
          correctIndex: 0,
          explanation:
            '1 + 3 + 5 = 9. It adds the odd numbers, because `i % 2 === 1` means "has a remainder when halved".',
          hints: ['Which values of i pass the `if`? Add just those.'],
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt: 'A function returns `undefined` when you expected a number. What is the likely cause?',
          options: [
            'It logs the value instead of returning it, or a branch has no `return`',
            'The number was too large',
            'You used `const` instead of `let`',
            'The function was called too many times',
          ],
          correctIndex: 0,
          explanation:
            'The `return` versus `console.log` confusion from chapter 6 — the single most common bug of your first month.',
        },
        {
          id: 'q3',
          kind: 'order',
          prompt: 'Order the steps for debugging a program that gives the wrong answer.',
          items: [
            'Read the error message, if there is one',
            'Work out which line produces the first wrong value',
            'Print the values around that line to confirm',
            'Fix that one thing and run it again',
          ],
          explanation:
            'Narrow down, confirm, then change one thing. Changing several at once means you will not know which fix worked.',
        },
        {
          id: 'q4',
          kind: 'code',
          prompt:
            'Write `passRate(scores)` returning the percentage of scores that are 50 or more. Empty array returns 0.',
          starterCode: 'function passRate(scores) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'passRate', args: [[50, 60, 40, 30]], expected: 50 },
            { type: 'function', name: 'passRate', args: [[100, 100]], expected: 100 },
            { type: 'function', name: 'passRate', args: [[10, 20]], expected: 0 },
            { type: 'function', name: 'passRate', args: [[]], expected: 0 },
          ],
          solution:
            'function passRate(scores) {\n  if (scores.length === 0) {\n    return 0;\n  }\n  let passed = 0;\n  for (let i = 0; i < scores.length; i = i + 1) {\n    if (scores[i] >= 50) {\n      passed = passed + 1;\n    }\n  }\n  return (passed / scores.length) * 100;\n}',
          explanation:
            'Guard the empty case, count the passes, turn it into a percentage. Note that exactly 50 counts as a pass — the first test checks it.',
          hints: [
            'Count how many pass, then divide by the total and multiply by 100.',
            'Handle the empty array before dividing.',
          ],
        },
        {
          id: 'q5',
          kind: 'code',
          prompt:
            'Write `summarize(students)` returning an object `{ top: <name of highest score>, average: <average score> }`.',
          starterCode:
            '// each student looks like { name: "Mia", score: 90 }\n\nfunction summarize(students) {\n  \n}\n',
          tests: [
            {
              type: 'function',
              name: 'summarize',
              args: [
                [
                  { name: 'Alex', score: 70 },
                  { name: 'Mia', score: 90 },
                  { name: 'Sam', score: 80 },
                ],
              ],
              expected: { top: 'Mia', average: 80 },
            },
            {
              type: 'function',
              name: 'summarize',
              args: [
                [
                  { name: 'Ann', score: 100 },
                  { name: 'Bo', score: 50 },
                ],
              ],
              expected: { top: 'Ann', average: 75 },
            },
          ],
          solution:
            'function summarize(students) {\n  let best = students[0];\n  let total = 0;\n  for (let i = 0; i < students.length; i = i + 1) {\n    total = total + students[i].score;\n    if (students[i].score > best.score) {\n      best = students[i];\n    }\n  }\n  return { top: best.name, average: total / students.length };\n}',
          explanation:
            'One loop doing two jobs, and an object returned so a single call answers two questions. This is a genuine piece of software — arrays, objects, loops, conditions and functions, all working together.',
          hints: [
            'You can add to the total and check for the best in the same loop.',
            'Build the answer with `return { top: ..., average: ... };`',
          ],
        },
        {
          id: 'q6',
          kind: 'code',
          prompt:
            'Last one. Write `fizzbuzz(n)` returning `"Fizz"` for multiples of 3, `"Buzz"` for multiples of 5, `"FizzBuzz"` for both, and the number itself otherwise.',
          starterCode: 'function fizzbuzz(n) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'fizzbuzz', args: [3], expected: 'Fizz' },
            { type: 'function', name: 'fizzbuzz', args: [5], expected: 'Buzz' },
            { type: 'function', name: 'fizzbuzz', args: [15], expected: 'FizzBuzz' },
            { type: 'function', name: 'fizzbuzz', args: [7], expected: 7 },
          ],
          solution:
            'function fizzbuzz(n) {\n  if (n % 3 === 0 && n % 5 === 0) {\n    return "FizzBuzz";\n  }\n  if (n % 3 === 0) {\n    return "Fizz";\n  }\n  if (n % 5 === 0) {\n    return "Buzz";\n  }\n  return n;\n}',
          explanation:
            'The "both" case has to be checked first, or 15 would return "Fizz" and stop — the same first-match-wins trap from chapter 4. Note the last line returns a number, not text: the test for 7 expects `7`, not `"7"`. You have finished the game.',
          hints: [
            'Check the both-at-once case before the individual ones.',
            'The final return gives back `n` itself, with no quotes.',
          ],
        },
      ],
    },
  ],
};
