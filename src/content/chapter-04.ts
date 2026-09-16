import type { Chapter } from '../types/content';

export const chapter04: Chapter = {
  id: 'ch04',
  title: 'Making Decisions',
  description: 'Conditions, comparisons and logic — teaching a program to choose.',
  icon: '🔀',
  levels: [
    {
      id: 'ch04-l01',
      title: 'True and False',
      concept: 'Every decision comes down to one true-or-false question.',
      baseXp: 50,
      intro: [
        'So far your programs ran every line, always. Real programs choose: show the discount only if the customer is a member; warn only if the battery is low.',
        'Every choice reduces to a question with a yes-or-no answer. In code those two answers are the values `true` and `false`, and they are a type of their own — called booleans.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'Which question can a program answer by itself?',
          options: [
            'Is this number greater than 100?',
            'Is this song any good?',
            'Should we hire this person?',
            'Is this colour tasteful?',
          ],
          correctIndex: 0,
          explanation:
            'A condition must be measurable. Comparing two numbers is; having taste is not.',
        },
        {
          id: 'q2',
          kind: 'true-false',
          prompt: 'In JavaScript, `true` and `false` are values you can store in a variable.',
          answer: true,
          explanation:
            '`let isLoggedIn = true;` is a perfectly ordinary variable. Booleans are values like any other.',
        },
        {
          id: 'q3',
          kind: 'mcq',
          prompt: 'How many possible values does a boolean have?',
          options: ['Two', 'One', 'Ten', 'As many as you like'],
          correctIndex: 0,
          explanation:
            'Just `true` and `false`. Every decision a computer makes, however complicated, is built out of these two.',
        },
        {
          id: 'q4',
          kind: 'mcq',
          prompt: 'Which everyday rule is already shaped like a condition?',
          options: [
            'If it is raining, take an umbrella',
            'Umbrellas are useful',
            'Rain is common in July',
            'I dislike getting wet',
          ],
          correctIndex: 0,
          explanation:
            '"If <something is true>, do <this>." That is the exact shape of the `if` statement you are about to write.',
        },
      ],
    },

    {
      id: 'ch04-l02',
      title: 'Comparing Values',
      concept: 'Comparison operators produce `true` or `false`.',
      baseXp: 50,
      intro: [
        'Comparisons ask a question and hand back `true` or `false`: `>` greater than, `<` less than, `>=` at least, `<=` at most.',
        'For "is it the same?" use `===` — three equals signs. One `=` assigns a value, three `=` compares. Mixing them up is a classic first-week bug.',
        '"Is it different?" is `!==`.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'console.log(10 > 3);',
          options: ['true', 'false', '10', '7'],
          correctIndex: 0,
          explanation: 'A comparison is a value. `10 > 3` is genuinely `true`, and that is what gets printed.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'const age = 18;\nconsole.log(age >= 18);',
          options: ['true', 'false', '18', 'Error'],
          correctIndex: 0,
          explanation:
            '`>=` means "greater than or equal to", so exactly 18 passes. With plain `>` it would have been `false` — that single character is the difference between letting an 18-year-old vote or not.',
        },
        {
          id: 'q3',
          kind: 'mcq',
          prompt: 'Which one checks whether two values are the same?',
          options: ['===', '=', '=>', '!=='],
          correctIndex: 0,
          explanation: '`=` assigns, `===` compares, `!==` checks for difference.',
        },
        {
          id: 'q4',
          kind: 'fill-blank',
          prompt: 'Check whether `name` is exactly the text `"admin"`.',
          template: 'console.log(name {{0}} "admin");',
          blanks: [{ choices: ['===', '=', '>', '=>'], correctIndex: 0 }],
          explanation:
            'Strings compare with `===` just like numbers do. Note that it is case-sensitive: `"Admin"` would be `false`.',
        },
        {
          id: 'q5',
          kind: 'predict-output',
          prompt: 'Careful — this one catches people out.',
          code: 'console.log("5" === 5);',
          options: ['false', 'true', '5', 'Error'],
          correctIndex: 0,
          explanation:
            '`===` compares the value *and* the type. Text `"5"` is not the number `5`, so the answer is `false`.',
          hints: ['One side is a string, the other is a number. Does `===` care about that?'],
        },
      ],
    },

    {
      id: 'ch04-l03',
      title: 'The if Statement',
      concept: 'Code inside `{ }` runs only when the condition is true.',
      baseXp: 50,
      intro: [
        'An `if` looks like this:\n\nif (temperature > 30) {\n    console.log("It is hot");\n}\n\nThe condition goes in round brackets. The code that depends on it goes in curly brackets.',
        'If the condition is `true`, the lines inside the curly brackets run. If it is `false`, they are skipped entirely and the program carries on below.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'const temp = 35;\nif (temp > 30) {\n  console.log("It is hot");\n}\nconsole.log("Done");',
          options: [
            'It is hot — then — Done',
            'Only Done',
            'Only It is hot',
            'Nothing at all',
          ],
          correctIndex: 0,
          explanation:
            '35 > 30 is true, so the inside runs. Then the program continues past the `if` and prints "Done" as usual.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'Now the condition is false.',
          code: 'const temp = 12;\nif (temp > 30) {\n  console.log("It is hot");\n}\nconsole.log("Done");',
          options: [
            'Only Done',
            'It is hot — then — Done',
            'Nothing at all',
            'Only It is hot',
          ],
          correctIndex: 0,
          explanation:
            'The block is skipped completely — but only the block. Lines after the closing `}` always run.',
        },
        {
          id: 'q3',
          kind: 'mcq',
          prompt: 'What goes inside the round brackets of an `if`?',
          options: [
            'A condition that is either true or false',
            'The code to run',
            'A variable name only',
            'The word "if"',
          ],
          correctIndex: 0,
          explanation:
            'Round brackets hold the question; curly brackets hold what to do about it.',
        },
        {
          id: 'q4',
          kind: 'order',
          prompt: 'Put the pieces of an `if` statement in order.',
          items: ['if', '(score > 50)', '{', 'console.log("Pass");', '}'],
          explanation:
            'Keyword, condition in round brackets, then the block in curly brackets. Every `if` you ever write has this shape.',
        },
      ],
    },

    {
      id: 'ch04-l04',
      title: 'if and else',
      concept: '`else` covers every case the `if` did not.',
      baseXp: 50,
      intro: [
        '`else` gives you the other path. Exactly one of the two blocks runs — never both, never neither.',
        'if (age >= 18) {\n    console.log("Welcome");\n} else {\n    console.log("Too young");\n}',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'const age = 15;\nif (age >= 18) {\n  console.log("Welcome");\n} else {\n  console.log("Too young");\n}',
          options: ['Too young', 'Welcome', 'Both lines', 'Nothing'],
          correctIndex: 0,
          explanation: '15 is not 18 or more, so the `else` branch runs. One or the other, always.',
        },
        {
          id: 'q2',
          kind: 'true-false',
          prompt: 'In an `if / else`, both blocks can run on the same pass.',
          answer: false,
          explanation:
            'Exactly one runs. If you ever need both, you wanted two separate `if` statements.',
        },
        {
          id: 'q3',
          kind: 'fill-blank',
          prompt: 'Complete this so it prints `"Pass"` for 50 or more, and `"Fail"` otherwise.',
          template:
            'if (score {{0}} 50) {\n  console.log("Pass");\n} {{1}} {\n  console.log("Fail");\n}',
          blanks: [
            { choices: ['>=', '>', '===', '<'], correctIndex: 0 },
            { choices: ['else', 'if', 'then', 'or'], correctIndex: 0 },
          ],
          explanation:
            '"50 or more" is `>=`. With plain `>`, a score of exactly 50 would fail — the kind of off-by-one that upsets real users.',
        },
        {
          id: 'q4',
          kind: 'predict-output',
          prompt: 'A trap. What actually prints?',
          code: 'const n = 5;\nif (n > 10) {\n  console.log("big");\n}\nelse {\n  console.log("small");\n}\nconsole.log("end");',
          options: [
            'small — then — end',
            'big — then — end',
            'Only end',
            'An error',
          ],
          correctIndex: 0,
          explanation:
            'Putting `else` on its own line is unusual to look at but perfectly legal — JavaScript does not care about the line break. 5 is not greater than 10, so "small" prints.',
        },
      ],
    },

    {
      id: 'ch04-l05',
      title: 'Write Your First Condition',
      concept: 'Write a working `if / else` from scratch.',
      baseXp: 50,
      questions: [
        {
          id: 'q1',
          kind: 'code',
          prompt:
            'The variable `age` is 20. Print `You can vote` if age is 18 or more, otherwise print `Too young`.',
          starterCode: 'const age = 20;\n\n// write an if / else here\n',
          tests: [{ type: 'output', expectedLogs: ['You can vote'], description: 'Prints You can vote' }],
          solution:
            'const age = 20;\nif (age >= 18) {\n  console.log("You can vote");\n} else {\n  console.log("Too young");\n}',
          explanation:
            'Try changing `age` to 12 and running again — the other branch takes over, and you never touched the logic. That is the whole point of writing the condition instead of the answer.',
          hints: [
            'The shape is: `if (condition) { ... } else { ... }`',
            '"18 or more" is `age >= 18`.',
          ],
        },
        {
          id: 'q2',
          kind: 'code',
          prompt:
            'A shop gives free delivery on orders of 500 or more. The order total is 420. Print `Free delivery` or `Delivery costs 40`.',
          starterCode: 'const total = 420;\n\n',
          tests: [
            { type: 'output', expectedLogs: ['Delivery costs 40'], description: 'Prints the right message' },
          ],
          solution:
            'const total = 420;\nif (total >= 500) {\n  console.log("Free delivery");\n} else {\n  console.log("Delivery costs 40");\n}',
          explanation:
            '420 falls short, so the `else` runs. Note how the boundary rule ("500 or more") turned directly into `>= 500`.',
          hints: ['420 is less than 500, so you expect the second message — but write both branches.'],
        },
        {
          id: 'q3',
          kind: 'code',
          prompt:
            'Print `Even` if `n` divides by 2 with nothing left over, otherwise `Odd`. `n` is 7. Use `%`, which gives the remainder: `7 % 2` is `1`.',
          starterCode: 'const n = 7;\n\n// hint: n % 2 === 0 means "even"\n',
          tests: [{ type: 'output', expectedLogs: ['Odd'], description: 'Prints Odd' }],
          solution:
            'const n = 7;\nif (n % 2 === 0) {\n  console.log("Even");\n} else {\n  console.log("Odd");\n}',
          explanation:
            '`%` (the remainder or "modulo" operator) is the standard way to test divisibility. `n % 2 === 0` is how every programmer writes "is even".',
          hints: ['`7 % 2` is 1, and `8 % 2` is 0.', 'Compare the remainder to 0 with `===`.'],
        },
      ],
    },

    {
      id: 'ch04-l06',
      title: 'else if Chains',
      concept: 'Test several possibilities in order; the first match wins.',
      baseXp: 50,
      intro: [
        'For more than two outcomes, chain them: `if ... else if ... else`. JavaScript checks each condition from the top and stops at the first one that is true.',
        'Because the first match wins, the order of the branches is part of the logic — not a style choice.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'const score = 85;\nif (score >= 90) {\n  console.log("A");\n} else if (score >= 80) {\n  console.log("B");\n} else {\n  console.log("C");\n}',
          options: ['B', 'A', 'C', 'B and C'],
          correctIndex: 0,
          explanation:
            '85 fails the first test, passes the second, and the chain stops there. The `else` is never reached.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'The order of the branches is wrong here. What prints?',
          code: 'const score = 95;\nif (score >= 50) {\n  console.log("Pass");\n} else if (score >= 90) {\n  console.log("Excellent");\n}',
          options: ['Pass', 'Excellent', 'Both', 'Nothing'],
          correctIndex: 0,
          explanation:
            '95 matches the first condition, so the chain stops — "Excellent" can never print for anyone. Put the most specific test first.',
          hints: ['Is 95 greater than or equal to 50? What happens once a branch matches?'],
        },
        {
          id: 'q3',
          kind: 'order',
          prompt:
            'Order these branches so each grade is reachable (highest first).',
          items: [
            'if (score >= 90) { console.log("A"); }',
            'else if (score >= 70) { console.log("B"); }',
            'else if (score >= 50) { console.log("C"); }',
            'else { console.log("Fail"); }',
          ],
          explanation:
            'Narrowest condition first, widest last. Reversed, everyone would get a C.',
        },
        {
          id: 'q4',
          kind: 'mcq',
          prompt: 'In a long `else if` chain, how many blocks run?',
          options: [
            'At most one — the first match',
            'All of the matching ones',
            'Always exactly two',
            'All of them, top to bottom',
          ],
          correctIndex: 0,
          explanation:
            'At most one. If nothing matches and there is no final `else`, nothing runs at all.',
        },
      ],
    },

    {
      id: 'ch04-l07',
      title: 'and, or',
      concept: 'Combine conditions with `&&` and `||`.',
      baseXp: 50,
      intro: [
        '`&&` means AND: the whole thing is true only when both sides are true.',
        '`||` means OR: true when at least one side is true.',
        'So "over 18 and has a ticket" is `age > 18 && hasTicket`, while "is staff or is a guest" is `isStaff || isGuest`.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'const age = 25;\nconst hasTicket = true;\nconsole.log(age >= 18 && hasTicket);',
          options: ['true', 'false', '25', 'Error'],
          correctIndex: 0,
          explanation: 'Both sides are true, so `&&` gives `true`.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'One side is false now.',
          code: 'const age = 25;\nconst hasTicket = false;\nconsole.log(age >= 18 && hasTicket);',
          options: ['false', 'true', '25', 'Error'],
          correctIndex: 0,
          explanation: '`&&` needs *everything* to be true. One false sinks it.',
        },
        {
          id: 'q3',
          kind: 'predict-output',
          prompt: 'Now with OR.',
          code: 'const isStaff = false;\nconst isGuest = true;\nconsole.log(isStaff || isGuest);',
          options: ['true', 'false', 'isGuest', 'Error'],
          correctIndex: 0,
          explanation: '`||` only needs one side to be true. Being a guest is enough.',
        },
        {
          id: 'q4',
          kind: 'fill-blank',
          prompt:
            'Allow entry only when the person is at least 18 AND has a ticket.',
          template: 'if (age >= 18 {{0}} hasTicket) {\n  console.log("Welcome");\n}',
          blanks: [{ choices: ['&&', '||', '&', 'and'], correctIndex: 0 }],
          explanation:
            'Two ampersands for AND, two pipes for OR. The single-character versions do something else entirely — do not reach for them.',
        },
        {
          id: 'q5',
          kind: 'mcq',
          prompt:
            'A discount applies to students OR pensioners. Which condition is right?',
          options: [
            'isStudent || isPensioner',
            'isStudent && isPensioner',
            'isStudent === isPensioner',
            'isStudent + isPensioner',
          ],
          correctIndex: 0,
          explanation:
            '`&&` would demand someone be both at once. Read the English word — "or" means `||`.',
        },
      ],
    },

    {
      id: 'ch04-l08',
      title: 'not, and Emptiness',
      concept: '`!` flips a condition; empty values count as false.',
      baseXp: 50,
      intro: [
        '`!` means NOT. It flips true to false and false to true. `!isLoggedIn` reads as "is not logged in".',
        'JavaScript also treats some non-boolean values as if they were false when used in a condition: `0`, `""` (empty text), `null` and `undefined`. Everything else counts as true.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'const isLoggedIn = false;\nconsole.log(!isLoggedIn);',
          options: ['true', 'false', 'undefined', 'Error'],
          correctIndex: 0,
          explanation: '`!` flips it. "Not logged in" is true when `isLoggedIn` is false.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'An empty string in a condition.',
          code: 'const name = "";\nif (name) {\n  console.log("Has a name");\n} else {\n  console.log("No name");\n}',
          options: ['No name', 'Has a name', 'Error', 'Nothing'],
          correctIndex: 0,
          explanation:
            'Empty text counts as false. This is the everyday way to check "did the user actually type something?"',
          hints: ['Empty text is one of the values JavaScript treats as false.'],
        },
        {
          id: 'q3',
          kind: 'mcq',
          prompt: 'Which of these counts as FALSE in a condition?',
          options: ['0', '1', '"hello"', '-5'],
          correctIndex: 0,
          explanation:
            'Only `0` is false among these. `-5` surprises people — it is a number that is not zero, so it counts as true.',
        },
        {
          id: 'q4',
          kind: 'predict-output',
          prompt: 'Combine `!` with a comparison.',
          code: 'const stock = 0;\nif (!stock) {\n  console.log("Out of stock");\n} else {\n  console.log("Available");\n}',
          options: ['Out of stock', 'Available', 'Error', '0'],
          correctIndex: 0,
          explanation:
            '`stock` is 0, which counts as false, so `!stock` is true. Compact and very common — though `stock === 0` says the same thing more plainly.',
        },
      ],
    },

    {
      id: 'ch04-l09',
      title: 'Boss: Logic Gate',
      concept: 'Every decision-making tool, in one level.',
      boss: true,
      baseXp: 150,
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'const n = 10;\nif (n > 5 && n < 20) {\n  console.log("in range");\n} else {\n  console.log("out of range");\n}',
          options: ['in range', 'out of range', 'true', 'Error'],
          correctIndex: 0,
          explanation:
            '10 is above 5 and below 20, so both sides of the `&&` hold. Two comparisons joined this way is the standard way to test a range.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'Which branch wins?',
          code: 'const t = 30;\nif (t >= 35) {\n  console.log("very hot");\n} else if (t >= 25) {\n  console.log("warm");\n} else {\n  console.log("cool");\n}',
          options: ['warm', 'very hot', 'cool', 'warm and cool'],
          correctIndex: 0,
          explanation: 'First test fails, second matches, chain stops.',
        },
        {
          id: 'q3',
          kind: 'mcq',
          prompt: 'Which comparison is `true`?',
          options: ['5 !== "5"', '5 === "5"', '5 > 10', '"a" === "A"'],
          correctIndex: 0,
          explanation:
            'A number and a string are genuinely different, so `!==` holds. And string comparison is case-sensitive, so `"a" === "A"` is false.',
        },
        {
          id: 'q4',
          kind: 'fill-blank',
          prompt:
            'Give a discount to anyone who is a member OR is spending 1000 or more.',
          template: 'if (isMember {{0}} total {{1}} 1000) {\n  console.log("Discount!");\n}',
          blanks: [
            { choices: ['||', '&&', '!', '==='], correctIndex: 0 },
            { choices: ['>=', '>', '===', '<'], correctIndex: 0 },
          ],
          explanation: '"or" is `||`, and "1000 or more" is `>=`.',
        },
        {
          id: 'q5',
          kind: 'code',
          prompt:
            'A score of 82. Print `A` for 90+, `B` for 80–89, `C` for 70–79, otherwise `F`.',
          starterCode: 'const score = 82;\n\n// if / else if / else\n',
          tests: [{ type: 'output', expectedLogs: ['B'], description: 'Prints B' }],
          solution:
            'const score = 82;\nif (score >= 90) {\n  console.log("A");\n} else if (score >= 80) {\n  console.log("B");\n} else if (score >= 70) {\n  console.log("C");\n} else {\n  console.log("F");\n}',
          explanation:
            'Highest threshold first. Because the chain stops at the first match, you never need to write `score >= 80 && score < 90` — the branch above has already handled those.',
          hints: [
            'Start with the highest grade and work down.',
            'Each `else if` only sees the scores the branches above rejected.',
          ],
        },
        {
          id: 'q6',
          kind: 'code',
          prompt:
            'A cinema ticket costs 200, but it is 120 for anyone under 12 or over 60. The customer is 68. Print just the price.',
          starterCode: 'const age = 68;\n\n// print 120 or 200\n',
          tests: [{ type: 'output', expectedLogs: ['120'], description: 'Prints the right price' }],
          solution:
            'const age = 68;\nif (age < 12 || age > 60) {\n  console.log(120);\n} else {\n  console.log(200);\n}',
          explanation:
            'Two conditions joined with `||`, because either one on its own earns the discount. Print the number without quotes — `console.log(120)` prints `120`, and so would `"120"`, but only one of them is actually a number.',
          hints: ['"under 12 or over 60" maps straight onto `age < 12 || age > 60`.'],
        },
      ],
    },
  ],
};
