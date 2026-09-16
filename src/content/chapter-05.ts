import type { Chapter } from '../types/content';

export const chapter05: Chapter = {
  id: 'ch05',
  title: 'Loops',
  description: 'Making the computer repeat work — and making sure it stops.',
  icon: '🔁',
  levels: [
    {
      id: 'ch05-l01',
      title: 'Why Repeat?',
      concept: 'Write a repeated instruction once instead of copying it.',
      baseXp: 50,
      intro: [
        'To print the numbers 1 to 1000, nobody writes a thousand `console.log` lines. You write one instruction and tell the computer to repeat it.',
        'That is a loop. It is where the "billions of steps per second" from chapter 1 finally pays off: you write three lines, the machine does the grinding.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'You need to print 500 names from a list. What is the sensible approach?',
          options: [
            'Write one instruction and loop it over the list',
            'Write 500 console.log lines',
            'Print only the first name',
            'Ask the user to type them out',
          ],
          correctIndex: 0,
          explanation:
            'Shorter to write, and if the greeting ever changes you edit one line instead of five hundred.',
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt: 'What are the three things every loop needs?',
          options: [
            'A starting point, a condition to keep going, and a way to move forward',
            'A name, a type and a value',
            'An if, an else and a comparison',
            'A number, a string and a boolean',
          ],
          correctIndex: 0,
          explanation:
            'Start, condition, step. If any one is missing or wrong, the loop either never runs or never stops.',
        },
        {
          id: 'q3',
          kind: 'true-false',
          prompt: 'Copying and pasting the same line 20 times does the same job as a loop.',
          answer: true,
          explanation:
            'It genuinely does — for exactly 20. The loop still wins: it handles any number, and a fix only has to be made once.',
        },
        {
          id: 'q4',
          kind: 'order',
          prompt: 'Order the life of a loop that counts from 1 to 3.',
          items: [
            'Start with the counter at 1',
            'Check whether the counter is still 3 or less',
            'Do the work inside the loop',
            'Add 1 to the counter and check again',
          ],
          explanation:
            'Start, check, work, step — then back to the check. The check always happens before the work.',
        },
      ],
    },

    {
      id: 'ch05-l02',
      title: 'The while Loop',
      concept: '`while` repeats as long as its condition stays true.',
      baseXp: 50,
      intro: [
        'A `while` loop is an `if` that keeps going:\n\nlet i = 1;\nwhile (i <= 3) {\n    console.log(i);\n    i = i + 1;\n}',
        'It checks the condition, runs the block, then checks again. When the condition is finally false, it stops and the program moves on.',
        'That `i = i + 1` line is what eventually ends it. Forget it and the loop runs forever.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'How many lines does this print?',
          code: 'let i = 1;\nwhile (i <= 3) {\n  console.log(i);\n  i = i + 1;\n}',
          options: ['3 lines: 1, 2, 3', '4 lines: 1, 2, 3, 4', '2 lines: 1, 2', 'It never stops'],
          correctIndex: 0,
          explanation:
            'i runs 1, 2, 3 and prints each. When i becomes 4 the condition fails, so 4 is never printed.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'The condition is false from the start. What happens?',
          code: 'let i = 10;\nwhile (i < 5) {\n  console.log(i);\n  i = i + 1;\n}\nconsole.log("done");',
          options: ['Only done', '10 then done', 'Nothing', 'It never stops'],
          correctIndex: 0,
          explanation:
            'The check happens first, so a `while` can run zero times. Useful: "while there are unread messages" does nothing when the inbox is empty.',
        },
        {
          id: 'q3',
          kind: 'fill-blank',
          prompt: 'Complete the loop so it counts 1, 2, 3, 4, 5.',
          template: 'let i = 1;\nwhile (i {{0}} 5) {\n  console.log(i);\n  i = i {{1}} 1;\n}',
          blanks: [
            { choices: ['<=', '<', '>', '==='], correctIndex: 0 },
            { choices: ['+', '-', '*', '/'], correctIndex: 0 },
          ],
          explanation:
            'With `<` instead of `<=`, it would stop at 4. With `-` instead of `+`, it would count downwards forever.',
        },
        {
          id: 'q4',
          kind: 'predict-output',
          prompt: 'Counting down this time.',
          code: 'let n = 3;\nwhile (n > 0) {\n  console.log(n);\n  n = n - 1;\n}\nconsole.log("Go!");',
          options: ['3, 2, 1, Go!', '3, 2, 1, 0, Go!', 'Go!', '1, 2, 3, Go!'],
          correctIndex: 0,
          explanation:
            'When n reaches 0 the condition `n > 0` fails, so 0 is never printed. Loops can count in either direction.',
        },
      ],
    },

    {
      id: 'ch05-l03',
      title: 'Loops That Never End',
      concept: 'A loop whose condition never becomes false hangs the program.',
      baseXp: 50,
      intro: [
        'If nothing inside the loop moves the condition towards false, the loop runs forever. The program freezes and stops responding.',
        'Every programmer writes one of these. In this game the sandbox stops your code after 2 seconds and tells you what happened — so go ahead and make the mistake on purpose at some point.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'What is wrong with this loop?',
          code: 'let i = 1;\nwhile (i <= 5) {\n  console.log(i);\n}',
          options: [
            '`i` is never increased, so the condition stays true forever',
            'The condition should use `<`',
            '`console.log` cannot go inside a loop',
            'Nothing is wrong',
          ],
          correctIndex: 0,
          explanation:
            'i stays 1 forever, so `i <= 5` stays true forever. The missing step is the single most common loop bug.',
        },
        {
          id: 'q2',
          kind: 'true-false',
          prompt: 'A loop that never ends will eventually stop on its own.',
          answer: false,
          explanation:
            'It will not. Something outside has to stop it — which is exactly what this game does after 2 seconds.',
        },
        {
          id: 'q3',
          kind: 'mcq',
          prompt: 'Which loop ends properly?',
          options: [
            'let i = 0; while (i < 3) { i = i + 1; }',
            'let i = 0; while (i < 3) { console.log(i); }',
            'let i = 5; while (i > 0) { i = i + 1; }',
            'let i = 0; while (i >= 0) { i = i + 1; }',
          ],
          correctIndex: 0,
          explanation:
            'Only the first moves towards its condition failing. The third counts away from zero, and the fourth has a condition that is true for every value it will ever hold.',
          hints: ['For each one, ask: does the variable get closer to making the condition false?'],
        },
        {
          id: 'q4',
          kind: 'code',
          prompt:
            'This loop never ends. Fix it so it prints 1, 2, 3 and then stops.',
          starterCode: 'let i = 1;\nwhile (i <= 3) {\n  console.log(i);\n}\n',
          tests: [{ type: 'output', expectedLogs: ['1', '2', '3'], description: 'Prints 1, 2, 3 then stops' }],
          solution: 'let i = 1;\nwhile (i <= 3) {\n  console.log(i);\n  i = i + 1;\n}',
          explanation:
            'One missing line was the difference between a working program and a frozen one. If you ran it before fixing it, you saw the 2-second timeout message — that is what an infinite loop looks like from the outside.',
          hints: ['Something has to change `i` inside the loop.', 'Add `i = i + 1;` after the print.'],
        },
      ],
    },

    {
      id: 'ch05-l04',
      title: 'The for Loop',
      concept: '`for` puts start, condition and step on one line.',
      baseXp: 50,
      intro: [
        'A counting loop always needs the same three parts, so JavaScript has a shorthand that puts them together:\n\nfor (let i = 1; i <= 3; i = i + 1) {\n    console.log(i);\n}',
        'Inside the round brackets, separated by semicolons: where to start, how long to keep going, and what to do after each pass.',
        'It does exactly what the `while` version did. It is just harder to forget the step, because it sits right there in the header.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What does this print?',
          code: 'for (let i = 1; i <= 3; i = i + 1) {\n  console.log(i);\n}',
          options: ['1, 2, 3', '1, 2, 3, 4', '0, 1, 2', '3, 2, 1'],
          correctIndex: 0,
          explanation: 'Start at 1, keep going while i is 3 or less, add 1 each time.',
        },
        {
          id: 'q2',
          kind: 'fill-blank',
          prompt: 'Complete the `for` loop so it prints 0, 1, 2, 3, 4.',
          template: 'for (let i = {{0}}; i {{1}} 5; i = i + 1) {\n  console.log(i);\n}',
          blanks: [
            { choices: ['0', '1', '5', '-1'], correctIndex: 0 },
            { choices: ['<', '<=', '>', '==='], correctIndex: 0 },
          ],
          explanation:
            'Starting at 0 with `< 5` gives exactly five passes: 0, 1, 2, 3, 4. This pattern is everywhere in real code, because lists are numbered from 0.',
        },
        {
          id: 'q3',
          kind: 'mcq',
          prompt: 'In `for (let i = 1; i <= 10; i = i + 2)`, what does the third part do?',
          options: [
            'Adds 2 to i after every pass, so it counts 1, 3, 5, 7, 9',
            'Runs the loop twice',
            'Stops the loop at 2',
            'Starts counting at 2',
          ],
          correctIndex: 0,
          explanation:
            'The step does not have to be 1. `i = i + 2` skips every other number; `i = i - 1` counts down.',
        },
        {
          id: 'q4',
          kind: 'predict-output',
          prompt: 'How many lines does this print?',
          code: 'for (let i = 0; i < 4; i = i + 1) {\n  console.log("hi");\n}',
          options: ['4', '3', '5', '0'],
          correctIndex: 0,
          explanation:
            'i takes the values 0, 1, 2, 3 — four passes. Starting at 0 with `< 4` is the standard way to say "do this 4 times".',
        },
      ],
    },

    {
      id: 'ch05-l05',
      title: 'Counting for Real',
      concept: 'Write loops that produce exact output.',
      baseXp: 50,
      questions: [
        {
          id: 'q1',
          kind: 'code',
          prompt: 'Print the numbers 1 to 5, each on its own line.',
          starterCode: '// use a for loop\n\n',
          tests: [
            { type: 'output', expectedLogs: ['1', '2', '3', '4', '5'], description: 'Prints 1 through 5' },
          ],
          solution: 'for (let i = 1; i <= 5; i = i + 1) {\n  console.log(i);\n}',
          explanation:
            'Print the variable, not a fixed number — that is what makes the output change on each pass.',
          hints: [
            'Start at 1 and keep going while i is 5 or less.',
            '`console.log(i)` — no quotes around i.',
          ],
        },
        {
          id: 'q2',
          kind: 'code',
          prompt: 'Print a countdown: 5, 4, 3, 2, 1, then the word `Liftoff`.',
          starterCode: '// count down, then print Liftoff\n\n',
          tests: [
            {
              type: 'output',
              expectedLogs: ['5', '4', '3', '2', '1', 'Liftoff'],
              description: 'Counts down then lifts off',
            },
          ],
          solution:
            'for (let i = 5; i >= 1; i = i - 1) {\n  console.log(i);\n}\nconsole.log("Liftoff");',
          explanation:
            'Start high, step downwards, and flip the comparison. The `Liftoff` line sits outside the loop — inside it, you would get five of them.',
          hints: ['Start at 5, subtract 1 each pass, keep going while i is 1 or more.', 'Put the last line after the closing `}`.'],
        },
        {
          id: 'q3',
          kind: 'code',
          prompt:
            'Print the 3 times table from 3 to 15: `3`, `6`, `9`, `12`, `15`.',
          starterCode: '// five lines of output\n\n',
          tests: [
            {
              type: 'output',
              expectedLogs: ['3', '6', '9', '12', '15'],
              description: 'Prints the 3 times table',
            },
          ],
          solution: 'for (let i = 1; i <= 5; i = i + 1) {\n  console.log(i * 3);\n}',
          explanation:
            'Two ways to get there: loop 1–5 and print `i * 3`, or start at 3 and step by 3. Both are correct — most problems have several right answers.',
          hints: ['Either step by 3, or loop 1 to 5 and multiply.'],
        },
      ],
    },

    {
      id: 'ch05-l06',
      title: 'Loops With Decisions Inside',
      concept: 'Put an `if` inside a loop to act on some passes only.',
      baseXp: 50,
      intro: [
        'A loop repeats; an `if` chooses. Put one inside the other and you can act on only some of the values.',
        'This combination — repeat over everything, act on the ones that match — is most of what real programs do all day.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What does this print?',
          code: 'for (let i = 1; i <= 5; i = i + 1) {\n  if (i % 2 === 0) {\n    console.log(i);\n  }\n}',
          options: ['2, 4', '1, 3, 5', '1, 2, 3, 4, 5', 'Nothing'],
          correctIndex: 0,
          explanation:
            'The loop visits every number; the `if` lets only the even ones through to the print.',
        },
        {
          id: 'q2',
          kind: 'code',
          prompt: 'Print only the even numbers from 1 to 10.',
          starterCode: '// loop over 1..10, print only the even ones\n\n',
          tests: [
            {
              type: 'output',
              expectedLogs: ['2', '4', '6', '8', '10'],
              description: 'Prints the even numbers',
            },
          ],
          solution:
            'for (let i = 1; i <= 10; i = i + 1) {\n  if (i % 2 === 0) {\n    console.log(i);\n  }\n}',
          explanation:
            'The `if` goes inside the loop body so it runs once per number. Put it outside and it would be checked only once, before any looping.',
          hints: ['`i % 2 === 0` is the test for even.', 'The `if` belongs inside the loop\'s curly brackets.'],
        },
        {
          id: 'q3',
          kind: 'code',
          prompt:
            'For the numbers 1 to 5, print `low` if the number is below 3, otherwise `high`.',
          starterCode: '// five lines of output: low, low, high, high, high\n\n',
          tests: [
            {
              type: 'output',
              expectedLogs: ['low', 'low', 'high', 'high', 'high'],
              description: 'Labels each number',
            },
          ],
          solution:
            'for (let i = 1; i <= 5; i = i + 1) {\n  if (i < 3) {\n    console.log("low");\n  } else {\n    console.log("high");\n  }\n}',
          explanation:
            'Every pass prints exactly one word, because `if / else` always picks one branch. Five passes, five lines.',
          hints: ['1 and 2 are below 3.'],
        },
      ],
    },

    {
      id: 'ch05-l07',
      title: 'Building Up a Total',
      concept: 'Keep a running total in a variable outside the loop.',
      baseXp: 50,
      intro: [
        'To add numbers up, keep a variable outside the loop and add to it on each pass:\n\nlet total = 0;\nfor (let i = 1; i <= 4; i = i + 1) {\n    total = total + i;\n}\nconsole.log(total);',
        'The crucial detail is *outside*. Declare `total` inside the loop and it would be reset to 0 on every single pass.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'let total = 0;\nfor (let i = 1; i <= 4; i = i + 1) {\n  total = total + i;\n}\nconsole.log(total);',
          options: ['10', '4', '0', '1234'],
          correctIndex: 0,
          explanation: '0 + 1 + 2 + 3 + 4 = 10. The total survives between passes because it lives outside the loop.',
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt: 'Why must `total` be declared outside the loop?',
          options: [
            'Inside, it would be created fresh and reset to 0 on every pass',
            'Because loops cannot contain variables',
            'Because `let` only works at the top of a file',
            'It makes no difference where it goes',
          ],
          correctIndex: 0,
          explanation:
            'A variable declared inside a block only lives for that block. The running total has to outlive each pass.',
        },
        {
          id: 'q3',
          kind: 'code',
          prompt: 'Add up the numbers 1 to 10 and print the total (just one line of output).',
          starterCode: 'let total = 0;\n\n// loop, add to total, then print it once\n',
          tests: [{ type: 'output', expectedLogs: ['55'], description: 'Prints 55' }],
          solution:
            'let total = 0;\nfor (let i = 1; i <= 10; i = i + 1) {\n  total = total + i;\n}\nconsole.log(total);',
          explanation:
            '55. Make sure the `console.log` is outside the loop — inside, you would print ten partial totals instead of one answer.',
          hints: ['Add `i` to `total` on each pass.', 'Print after the loop has finished, not inside it.'],
        },
        {
          id: 'q4',
          kind: 'code',
          prompt:
            'Count how many numbers between 1 and 20 divide exactly by 3, and print just that count.',
          starterCode: 'let count = 0;\n\n',
          tests: [{ type: 'output', expectedLogs: ['6'], description: 'Prints 6' }],
          solution:
            'let count = 0;\nfor (let i = 1; i <= 20; i = i + 1) {\n  if (i % 3 === 0) {\n    count = count + 1;\n  }\n}\nconsole.log(count);',
          explanation:
            '3, 6, 9, 12, 15, 18 — six of them. Counting is the same pattern as summing: a variable outside, updated inside, printed after.',
          hints: ['`i % 3 === 0` means "divides exactly by 3".', 'Add 1 to `count`, not `i`.'],
        },
      ],
    },

    {
      id: 'ch05-l08',
      title: 'Boss: The Repeat Engine',
      concept: 'Loops, conditions and totals under one roof.',
      boss: true,
      baseXp: 150,
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'How many lines print?',
          code: 'for (let i = 0; i < 3; i = i + 1) {\n  console.log("x");\n}',
          options: ['3', '2', '4', '0'],
          correctIndex: 0,
          explanation: 'i is 0, 1, 2 — three passes.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'What is the final total?',
          code: 'let total = 0;\nfor (let i = 1; i <= 3; i = i + 1) {\n  total = total + i * 2;\n}\nconsole.log(total);',
          options: ['12', '6', '9', '8'],
          correctIndex: 0,
          explanation: '2 + 4 + 6 = 12. Multiplication happens before the addition into `total`.',
          hints: ['Work out `i * 2` for each pass first, then add them up.'],
        },
        {
          id: 'q3',
          kind: 'mcq',
          prompt: 'Which loop runs forever?',
          options: [
            'let i = 0; while (i < 5) { console.log(i); }',
            'for (let i = 0; i < 5; i = i + 1) { console.log(i); }',
            'let i = 5; while (i > 0) { i = i - 1; }',
            'for (let i = 10; i > 0; i = i - 2) { console.log(i); }',
          ],
          correctIndex: 0,
          explanation: 'The first never changes `i`, so its condition can never become false.',
        },
        {
          id: 'q4',
          kind: 'fill-blank',
          prompt: 'Complete a loop that prints 10, 8, 6, 4, 2.',
          template: 'for (let i = 10; i {{0}} 0; i = i {{1}} 2) {\n  console.log(i);\n}',
          blanks: [
            { choices: ['>', '<', '>=', '==='], correctIndex: 0 },
            { choices: ['-', '+', '*', '/'], correctIndex: 0 },
          ],
          explanation:
            'Counting down needs `>` and a subtraction. With `>=` it would also print 0.',
        },
        {
          id: 'q5',
          kind: 'code',
          prompt:
            'Print the numbers 1 to 15, but print `Fizz` instead of any number that divides by 3.',
          starterCode: '// 1, 2, Fizz, 4, 5, Fizz, ...\n\n',
          tests: [
            {
              type: 'output',
              expectedLogs: [
                '1',
                '2',
                'Fizz',
                '4',
                '5',
                'Fizz',
                '7',
                '8',
                'Fizz',
                '10',
                '11',
                'Fizz',
                '13',
                '14',
                'Fizz',
              ],
              description: 'Fizz replaces every multiple of 3',
            },
          ],
          solution:
            'for (let i = 1; i <= 15; i = i + 1) {\n  if (i % 3 === 0) {\n    console.log("Fizz");\n  } else {\n    console.log(i);\n  }\n}',
          explanation:
            'This is half of "FizzBuzz", a famous interview warm-up. You now have every tool it needs: a loop, a remainder test and an if/else.',
          hints: [
            'Every pass prints exactly one thing — either the number or the word.',
            '`i % 3 === 0` picks out the multiples of 3.',
          ],
        },
        {
          id: 'q6',
          kind: 'code',
          prompt:
            'Add up only the even numbers from 1 to 100 and print the total.',
          starterCode: 'let total = 0;\n\n',
          tests: [{ type: 'output', expectedLogs: ['2550'], description: 'Prints 2550' }],
          solution:
            'let total = 0;\nfor (let i = 1; i <= 100; i = i + 1) {\n  if (i % 2 === 0) {\n    total = total + i;\n  }\n}\nconsole.log(total);',
          explanation:
            '2550. Fifty numbers added in a fraction of a millisecond — this is the moment loops stop being an exercise and start being genuinely useful.',
          hints: ['Combine the counting loop, the even test and the running total.'],
        },
      ],
    },
  ],
};
