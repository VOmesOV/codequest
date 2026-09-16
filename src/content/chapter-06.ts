import type { Chapter } from '../types/content';

export const chapter06: Chapter = {
  id: 'ch06',
  title: 'Functions',
  description: 'Name a piece of work once, then use it anywhere.',
  icon: '⚙️',
  levels: [
    {
      id: 'ch06-l01',
      title: 'What Is a Function?',
      concept: 'A function is a named, reusable piece of work.',
      baseXp: 50,
      intro: [
        'A function is a chunk of code with a name. You write it once, then run it whenever you like by calling its name.',
        'Think of a coffee machine: you press a button (call it), it does its hidden steps, and out comes coffee (a result). You do not need to know what happens inside to use it.',
        'Functions are how programs stay manageable. Without them, every program would be one enormous list of steps.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'What is a function?',
          options: [
            'A named piece of code you can run whenever you need it',
            'A variable that holds a number',
            'A loop that repeats forever',
            'Another word for a program',
          ],
          correctIndex: 0,
          explanation: 'Named, and reusable. Those two properties are the whole point.',
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt: 'Why use functions instead of repeating the same code?',
          options: [
            'Write it once, fix it in one place, and give it a name that explains it',
            'Functions make programs run faster',
            'Because loops do not exist',
            'To use up fewer variables',
          ],
          correctIndex: 0,
          explanation:
            'The naming matters as much as the reuse. `calculateTax(price)` tells a reader what is happening; six lines of arithmetic do not.',
        },
        {
          id: 'q3',
          kind: 'true-false',
          prompt: 'You have already used a function in this game.',
          answer: true,
          explanation:
            '`console.log(...)` is a function. Someone else wrote it; you have been calling it since chapter 3.',
        },
        {
          id: 'q4',
          kind: 'mcq',
          prompt: 'What does it mean to "call" a function?',
          options: [
            'To run it, by writing its name followed by round brackets',
            'To create it for the first time',
            'To delete it',
            'To rename it',
          ],
          correctIndex: 0,
          explanation:
            'Defining a function does not run it. `greet()` — with the brackets — is what makes it actually happen.',
        },
      ],
    },

    {
      id: 'ch06-l02',
      title: 'Calling and Passing Values',
      concept: 'Arguments are the values you hand a function.',
      baseXp: 50,
      intro: [
        'Most functions need information to do their job. You pass it inside the round brackets: `console.log("hi")` hands the text `"hi"` over.',
        'Those values are called arguments. A function can take none, one, or several separated by commas.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'In `Math.max(3, 9)`, what are `3` and `9`?',
          options: [
            'Arguments — the values passed in',
            'Variables being created',
            'The function name',
            'The result',
          ],
          correctIndex: 0,
          explanation: 'Values passed in are arguments. `Math.max(3, 9)` hands over two and gives back `9`.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'console.log(Math.max(4, 11, 7));',
          options: ['11', '4', '7', '22'],
          correctIndex: 0,
          explanation: '`Math.max` gives back the largest of whatever you pass it. Three arguments here.',
        },
        {
          id: 'q3',
          kind: 'predict-output',
          prompt: 'A function that gives something back can be used like any value.',
          code: 'const biggest = Math.max(2, 8);\nconsole.log(biggest + 1);',
          options: ['9', '8', '3', '11'],
          correctIndex: 0,
          explanation:
            '`Math.max(2, 8)` becomes `8`, which goes into the variable. A function call that returns a value *is* a value.',
        },
        {
          id: 'q4',
          kind: 'mcq',
          prompt: 'What happens if you write `greet` without brackets?',
          options: [
            'Nothing runs — you referred to the function instead of calling it',
            'It runs anyway',
            'The program crashes',
            'It deletes the function',
          ],
          correctIndex: 0,
          explanation:
            'The brackets are the "do it now" part. Forgetting them is a genuinely common bug, and a silent one.',
        },
      ],
    },

    {
      id: 'ch06-l03',
      title: 'Writing Your Own',
      concept: 'The anatomy of a function definition.',
      baseXp: 50,
      intro: [
        'Here is a function you write yourself:\n\nfunction greet(name) {\n    console.log("Hello, " + name);\n}\n\ngreet("Sam");',
        'The keyword `function`, a name you choose, a parameter list in round brackets, and the body in curly brackets.',
        '`name` is a parameter: a variable that gets filled in with whatever the caller passes. Define once, call with different values as often as you like.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'order',
          prompt: 'Put the parts of a function definition in order.',
          items: ['function', 'greet', '(name)', '{', 'console.log(name);', '}'],
          explanation:
            'Keyword, name, parameters, then the body in curly brackets. Every function you write follows this shape.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'function greet(name) {\n  console.log("Hello, " + name);\n}\ngreet("Sam");\ngreet("Ann");',
          options: ['Hello, Sam then Hello, Ann', 'Hello, Sam', 'Hello, name twice', 'Nothing'],
          correctIndex: 0,
          explanation:
            'One definition, two calls, two different results. `name` holds a different value on each call.',
        },
        {
          id: 'q3',
          kind: 'predict-output',
          prompt: 'The function is defined but never called. What prints?',
          code: 'function greet() {\n  console.log("Hello");\n}\nconsole.log("Start");',
          options: ['Only Start', 'Hello then Start', 'Start then Hello', 'Nothing'],
          correctIndex: 0,
          explanation:
            'Defining a function does not run it — it only stores it under a name. Without `greet()` somewhere, the body never executes.',
          hints: ['Is there a line anywhere that actually calls `greet`?'],
        },
        {
          id: 'q4',
          kind: 'fill-blank',
          prompt: 'Complete a function called `sayHi` that takes no parameters.',
          template: '{{0}} sayHi{{1}} {\n  console.log("Hi");\n}',
          blanks: [
            { choices: ['function', 'const', 'let', 'def'], correctIndex: 0 },
            { choices: ['()', '{}', '[]', ';'], correctIndex: 0 },
          ],
          explanation:
            'Even with no parameters, the empty round brackets are required — both when defining and when calling.',
        },
      ],
    },

    {
      id: 'ch06-l04',
      title: 'return vs console.log',
      concept: '`return` hands a value back; `console.log` only displays it.',
      baseXp: 50,
      intro: [
        'This trips up nearly every beginner. `console.log` shows something on screen. `return` hands a value back to whoever called the function, so it can be stored and used.',
        'A function that only logs gives back nothing — `undefined`. You cannot do maths with it or store anything useful.',
        'Rule of thumb: functions that calculate should `return`. Printing is the caller\'s business.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'function double(n) {\n  return n * 2;\n}\nconsole.log(double(5));',
          options: ['10', 'undefined', '5', 'Nothing'],
          correctIndex: 0,
          explanation: '`double(5)` becomes `10`, and the `console.log` prints it.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'The function logs instead of returning. What prints?',
          code: 'function double(n) {\n  console.log(n * 2);\n}\nconst result = double(5);\nconsole.log(result);',
          options: ['10 then undefined', '10 then 10', 'undefined', '10'],
          correctIndex: 0,
          explanation:
            'The function prints 10 itself, then gives back nothing — so `result` is `undefined`. This exact confusion costs beginners hours; now you can name it.',
          hints: ['What does a function without a `return` hand back to its caller?'],
        },
        {
          id: 'q3',
          kind: 'predict-output',
          prompt: 'What happens after a `return`?',
          code: 'function test() {\n  return 1;\n  console.log("after");\n}\nconsole.log(test());',
          options: ['1', 'after then 1', '1 then after', 'after'],
          correctIndex: 0,
          explanation:
            '`return` leaves the function immediately. Anything written after it never runs — which is also a handy way to exit early.',
        },
        {
          id: 'q4',
          kind: 'mcq',
          prompt: 'When should a function `return` rather than log?',
          options: [
            'Whenever the caller needs to use the result',
            'Never — logging is always better',
            'Only inside loops',
            'Only when the result is a number',
          ],
          correctIndex: 0,
          explanation:
            'Returning keeps the function useful anywhere: you can print it, store it, or feed it into another function.',
        },
      ],
    },

    {
      id: 'ch06-l05',
      title: 'Write a Function',
      concept: 'Define functions that return the right value for any input.',
      baseXp: 50,
      intro: [
        'From here on, the tests call your function themselves — with several different values.',
        'That means guessing is off the table: your logic has to be genuinely right, not right for one example.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'code',
          prompt: 'Write a function `double(n)` that returns `n` multiplied by 2.',
          starterCode: '// return, do not log\n\nfunction double(n) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'double', args: [5], expected: 10 },
            { type: 'function', name: 'double', args: [0], expected: 0 },
            { type: 'function', name: 'double', args: [-3], expected: -6 },
          ],
          solution: 'function double(n) {\n  return n * 2;\n}',
          explanation:
            'Three different inputs, all correct — that is a function that actually works, not one that happens to match an example.',
          hints: ['Use `return`, not `console.log`.', 'The body is a single line: `return n * 2;`'],
        },
        {
          id: 'q2',
          kind: 'code',
          prompt:
            'Write `rectangleArea(width, height)` that returns the area (width times height).',
          starterCode: 'function rectangleArea(width, height) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'rectangleArea', args: [3, 4], expected: 12 },
            { type: 'function', name: 'rectangleArea', args: [10, 1], expected: 10 },
            { type: 'function', name: 'rectangleArea', args: [0, 7], expected: 0 },
          ],
          solution: 'function rectangleArea(width, height) {\n  return width * height;\n}',
          explanation:
            'Two parameters, separated by a comma. They are filled in from left to right by the values the caller passes.',
          hints: ['Multiply the two parameters and return the result.'],
        },
        {
          id: 'q3',
          kind: 'code',
          prompt:
            'Write `isEven(n)` that returns `true` when `n` is even and `false` when it is odd.',
          starterCode: 'function isEven(n) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'isEven', args: [4], expected: true },
            { type: 'function', name: 'isEven', args: [7], expected: false },
            { type: 'function', name: 'isEven', args: [0], expected: true },
          ],
          solution: 'function isEven(n) {\n  return n % 2 === 0;\n}',
          explanation:
            'An `if / else` returning true or false works too — but `return n % 2 === 0;` is already a true-or-false value, so there is nothing to decide.',
          hints: [
            '`n % 2 === 0` is itself `true` or `false`.',
            'You can return a comparison directly.',
          ],
        },
      ],
    },

    {
      id: 'ch06-l06',
      title: 'Conditions Inside Functions',
      concept: 'Return different values depending on the input.',
      baseXp: 50,
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'function check(n) {\n  if (n > 10) {\n    return "big";\n  }\n  return "small";\n}\nconsole.log(check(3));',
          options: ['small', 'big', 'undefined', 'Nothing'],
          correctIndex: 0,
          explanation:
            'The `if` does not match, so execution falls through to the last line. No `else` needed — an early `return` already ended the other path.',
        },
        {
          id: 'q2',
          kind: 'code',
          prompt:
            'Write `canVote(age)` that returns `true` for 18 and over, `false` otherwise.',
          starterCode: 'function canVote(age) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'canVote', args: [20], expected: true },
            { type: 'function', name: 'canVote', args: [18], expected: true },
            { type: 'function', name: 'canVote', args: [17], expected: false },
          ],
          solution: 'function canVote(age) {\n  return age >= 18;\n}',
          explanation:
            'Note the test for exactly 18 — the boundary is where off-by-one bugs live, which is exactly why it is tested.',
          hints: ['"18 and over" is `age >= 18`.'],
        },
        {
          id: 'q3',
          kind: 'code',
          prompt:
            'Write `grade(score)` returning `"A"` for 90+, `"B"` for 80–89, `"C"` for 70–79, and `"F"` below 70.',
          starterCode: 'function grade(score) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'grade', args: [95], expected: 'A' },
            { type: 'function', name: 'grade', args: [80], expected: 'B' },
            { type: 'function', name: 'grade', args: [72], expected: 'C' },
            { type: 'function', name: 'grade', args: [40], expected: 'F' },
          ],
          solution:
            'function grade(score) {\n  if (score >= 90) {\n    return "A";\n  } else if (score >= 80) {\n    return "B";\n  } else if (score >= 70) {\n    return "C";\n  }\n  return "F";\n}',
          explanation:
            'Same `else if` chain as chapter 4, now returning instead of printing — which makes it reusable anywhere in a program.',
          hints: [
            'Highest threshold first.',
            'Return the letter as text, with quotes.',
          ],
        },
        {
          id: 'q4',
          kind: 'code',
          prompt:
            'Write `max2(a, b)` that returns whichever of the two numbers is larger. If they are equal, return either.',
          starterCode: 'function max2(a, b) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'max2', args: [3, 9], expected: 9 },
            { type: 'function', name: 'max2', args: [10, 2], expected: 10 },
            { type: 'function', name: 'max2', args: [5, 5], expected: 5 },
          ],
          solution:
            'function max2(a, b) {\n  if (a > b) {\n    return a;\n  }\n  return b;\n}',
          explanation:
            'When they are equal, `a > b` is false and `b` comes back — which is the same number, so the equal case needs no special handling.',
          hints: ['Compare them with `>`, and return the winner.'],
        },
      ],
    },

    {
      id: 'ch06-l07',
      title: 'Functions Using Functions',
      concept: 'Build bigger behaviour by combining small functions.',
      baseXp: 50,
      intro: [
        'A function can call another function. This is how real programs are built: small, well-named pieces, stacked up.',
        'Each piece stays small enough to hold in your head, and each one can be checked on its own.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'function double(n) {\n  return n * 2;\n}\nfunction quadruple(n) {\n  return double(double(n));\n}\nconsole.log(quadruple(3));',
          options: ['12', '6', '3', '24'],
          correctIndex: 0,
          explanation:
            'The inner `double(3)` gives 6, which is passed to the outer `double`, giving 12. Innermost brackets are worked out first.',
          hints: ['Work from the inside out: what is `double(3)` first?'],
        },
        {
          id: 'q2',
          kind: 'code',
          prompt:
            'Given `double(n)`, write `addThenDouble(a, b)` that adds the two numbers and returns the doubled result. You must call `double`.',
          starterCode:
            'function double(n) {\n  return n * 2;\n}\n\nfunction addThenDouble(a, b) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'addThenDouble', args: [2, 3], expected: 10 },
            { type: 'function', name: 'addThenDouble', args: [0, 0], expected: 0 },
            { type: 'function', name: 'addThenDouble', args: [10, 5], expected: 30 },
          ],
          solution:
            'function double(n) {\n  return n * 2;\n}\n\nfunction addThenDouble(a, b) {\n  return double(a + b);\n}',
          explanation:
            'Reusing `double` means the doubling logic exists in exactly one place. If it ever needs to change, you change it once.',
          hints: ['Add first, then hand the sum to `double`.'],
        },
        {
          id: 'q3',
          kind: 'code',
          prompt:
            'Write `describe(n)` that returns `"even"` or `"odd"`. Use the `isEven` function that is already provided.',
          starterCode:
            'function isEven(n) {\n  return n % 2 === 0;\n}\n\nfunction describe(n) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'describe', args: [4], expected: 'even' },
            { type: 'function', name: 'describe', args: [7], expected: 'odd' },
            { type: 'function', name: 'describe', args: [0], expected: 'even' },
          ],
          solution:
            'function isEven(n) {\n  return n % 2 === 0;\n}\n\nfunction describe(n) {\n  if (isEven(n)) {\n    return "even";\n  }\n  return "odd";\n}',
          explanation:
            '`isEven(n)` already gives back true or false, so it can go straight into the `if` with no comparison needed. Writing `if (isEven(n) === true)` would work but says the same thing twice.',
          hints: ['`isEven(n)` is already a true-or-false value — put it straight in the `if`.'],
        },
      ],
    },

    {
      id: 'ch06-l08',
      title: 'Boss: The Function Factory',
      concept: 'Define, call, return and combine — all of it.',
      boss: true,
      baseXp: 150,
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'function add(a, b) {\n  return a + b;\n}\nconsole.log(add(add(1, 2), 3));',
          options: ['6', '3', '123', 'undefined'],
          correctIndex: 0,
          explanation: '`add(1, 2)` is 3, then `add(3, 3)` is 6. Inside out, always.',
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt: 'A function has no `return`. What does calling it give back?',
          options: ['undefined', '0', 'An error', 'The last line of the function'],
          correctIndex: 0,
          explanation:
            '`undefined` — JavaScript\'s way of saying "there is no value here". Seeing `undefined` where you expected a number almost always means a missing `return`.',
        },
        {
          id: 'q3',
          kind: 'fill-blank',
          prompt: 'Complete a function that gives back the square of a number.',
          template: 'function square(n) {\n  {{0}} n {{1}} n;\n}',
          blanks: [
            { choices: ['return', 'console.log', 'let', 'if'], correctIndex: 0 },
            { choices: ['*', '+', '-', '/'], correctIndex: 0 },
          ],
          explanation: '`return n * n;` — hands the value back rather than just showing it.',
        },
        {
          id: 'q4',
          kind: 'code',
          prompt:
            'Write `celsiusToFahrenheit(c)` returning `c * 9 / 5 + 32`.',
          starterCode: 'function celsiusToFahrenheit(c) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'celsiusToFahrenheit', args: [0], expected: 32 },
            { type: 'function', name: 'celsiusToFahrenheit', args: [100], expected: 212 },
            { type: 'function', name: 'celsiusToFahrenheit', args: [30], expected: 86 },
          ],
          solution: 'function celsiusToFahrenheit(c) {\n  return (c * 9) / 5 + 32;\n}',
          explanation:
            'The same converter from the chapter 1 boss, now written for real. Multiplication and division run before the addition, so no brackets are strictly needed.',
          hints: ['Multiply by 9, divide by 5, then add 32.'],
        },
        {
          id: 'q5',
          kind: 'code',
          prompt:
            'Write `applyDiscount(price, isMember)` — members pay 10% less, everyone else pays full price.',
          starterCode: 'function applyDiscount(price, isMember) {\n  \n}\n',
          tests: [
            { type: 'function', name: 'applyDiscount', args: [100, true], expected: 90 },
            { type: 'function', name: 'applyDiscount', args: [100, false], expected: 100 },
            { type: 'function', name: 'applyDiscount', args: [250, true], expected: 225 },
          ],
          solution:
            'function applyDiscount(price, isMember) {\n  if (isMember) {\n    return price * 0.9;\n  }\n  return price;\n}',
          explanation:
            '`isMember` is already true or false, so it goes straight into the `if`. Paying 10% less means paying 90% — multiply by 0.9.',
          hints: ['10% off means `price * 0.9`.', '`isMember` needs no comparison — use it directly.'],
        },
        {
          id: 'q6',
          kind: 'code',
          prompt:
            'Write `countdownText(n)` that returns a single string counting down, like `"3-2-1"` for 3. For 1 it returns `"1"`.',
          starterCode: 'function countdownText(n) {\n  let text = "";\n  \n}\n',
          tests: [
            { type: 'function', name: 'countdownText', args: [3], expected: '3-2-1' },
            { type: 'function', name: 'countdownText', args: [1], expected: '1' },
            { type: 'function', name: 'countdownText', args: [5], expected: '5-4-3-2-1' },
          ],
          solution:
            'function countdownText(n) {\n  let text = "";\n  for (let i = n; i >= 1; i = i - 1) {\n    text = text + i;\n    if (i > 1) {\n      text = text + "-";\n    }\n  }\n  return text;\n}',
          explanation:
            'A loop, a condition and a running total — except the total is text instead of a number. The separator needs the `if`, otherwise you would get a trailing dash.',
          hints: [
            'Build up a string the same way you built up a number total.',
            'Only add the "-" when this is not the last number.',
          ],
        },
      ],
    },
  ],
};
