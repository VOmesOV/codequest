import type { Chapter } from '../types/content';

export const chapter03: Chapter = {
  id: 'ch03',
  title: 'Variables and Data',
  description: 'Real JavaScript starts here — storing values and printing them out.',
  icon: '📦',
  levels: [
    {
      id: 'ch03-l01',
      title: 'What Is a Variable?',
      concept: 'A variable is a named box that holds one value.',
      baseXp: 50,
      intro: [
        'A variable is a labelled box that holds one value. You put something in, and later you refer to it by its name instead of repeating the value.',
        'In JavaScript: `let score = 10;` creates a box called `score` holding `10`. From then on, writing `score` means "whatever is in that box right now".',
        'Why bother? Because the value can change, and because a name explains what a number means. `47` tells you nothing; `temperature` tells you everything.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'What does a variable do?',
          options: [
            'Stores a value under a name you choose',
            'Makes the program run faster',
            'Prints something to the screen',
            'Fixes mistakes in your code',
          ],
          correctIndex: 0,
          explanation: 'A name, and a value stored under it. Nothing more mysterious than that.',
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt: 'In `let city = "Bangkok";` which part is the variable name?',
          code: 'let city = "Bangkok";',
          options: ['city', '"Bangkok"', 'let', 'The semicolon'],
          correctIndex: 0,
          explanation:
            '`let` says "make a new variable", `city` is the name, `"Bangkok"` is the value going into the box.',
        },
        {
          id: 'q3',
          kind: 'true-false',
          prompt: 'A variable can hold more than one value at the same time.',
          answer: false,
          explanation:
            'One box, one value. (Later you will meet arrays — a single value that happens to be a whole list.)',
        },
        {
          id: 'q4',
          kind: 'mcq',
          prompt: 'Which variable name explains itself best?',
          options: ['totalPrice', 'x2', 'thing', 'a'],
          correctIndex: 0,
          explanation:
            'Names are how you (and everyone after you) read code six months later. Spend the extra two seconds.',
        },
      ],
    },

    {
      id: 'ch03-l02',
      title: 'let and the Equals Sign',
      concept: '`=` means "put this value in this box", not "is equal to".',
      baseXp: 50,
      intro: [
        'In maths, `=` means "these two things are equal". In code it means something different: "take the value on the right and put it in the box on the left".',
        'So `let total = 5 + 3;` works out `8` first, then stores it. Read `=` as "gets" and it stops being confusing: "total gets 8".',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'What does `=` mean in JavaScript?',
          options: [
            'Put the value on the right into the name on the left',
            'Check whether both sides are equal',
            'Add the two sides together',
            'Print the result',
          ],
          correctIndex: 0,
          explanation:
            'Assignment, not comparison. Comparison has its own symbol, `===`, which you will meet in the chapter on conditions.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'What does this print?',
          code: 'let total = 5 + 3;\nconsole.log(total);',
          options: ['8', '5 + 3', '53', 'total'],
          correctIndex: 0,
          explanation: 'The right-hand side is worked out first, then stored. The box holds `8`.',
        },
        {
          id: 'q3',
          kind: 'fill-blank',
          prompt: 'Complete the line so it creates a variable `age` holding the number 25.',
          template: '{{0}} age {{1}} 25;',
          blanks: [
            { choices: ['let', 'log', 'make', 'new'], correctIndex: 0 },
            { choices: ['=', '==', ':', '=>'], correctIndex: 0 },
          ],
          explanation: '`let` creates the variable, a single `=` puts the value in it.',
        },
        {
          id: 'q4',
          kind: 'predict-output',
          prompt: 'The right side is worked out before it is stored. What prints?',
          code: 'let price = 20;\nlet withTax = price * 1.1;\nconsole.log(withTax);',
          options: ['22', '20', '20 * 1.1', '2.2'],
          correctIndex: 0,
          explanation:
            '`price * 1.1` becomes `22`, and only then is it stored in `withTax`. A variable never stores the calculation, only its result.',
        },
      ],
    },

    {
      id: 'ch03-l03',
      title: 'Numbers and Text',
      concept: 'Quotes decide whether something is text or a number.',
      baseXp: 50,
      intro: [
        'JavaScript cares about the *type* of a value. `25` is a number you can do maths with. `"25"` — in quotes — is text that happens to look like a number.',
        'Text values are called strings. Quotes are what make a string a string: `"hello"` and `\'hello\'` both work, as long as you match them.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'Which of these is a string?',
          options: ['"42"', '42', '4 + 2', 'let'],
          correctIndex: 0,
          explanation: 'The quotes are the whole difference. Inside quotes it is text, whatever it looks like.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'Both are numbers here. What prints?',
          code: 'let a = 10;\nlet b = 5;\nconsole.log(a + b);',
          options: ['15', '105', '"105"', 'a + b'],
          correctIndex: 0,
          explanation: 'Number plus number is addition. Straightforward — the surprise is in the next question.',
        },
        {
          id: 'q3',
          kind: 'predict-output',
          prompt: 'Look carefully at the quotes.',
          code: 'let a = "10";\nlet b = "5";\nconsole.log(a + b);',
          options: ['105', '15', '"15"', 'Error'],
          correctIndex: 0,
          explanation:
            'These are strings, so `+` glues them together instead of adding: "10" and "5" become "105". This trips up absolutely everyone at least once.',
          hints: ['What does `+` do to two pieces of text, rather than two numbers?'],
        },
        {
          id: 'q4',
          kind: 'true-false',
          prompt: '`"7"` and `7` are the same thing to JavaScript.',
          answer: false,
          explanation:
            'One is text, one is a number, and they behave differently with `+`. When maths gives you a weird result, check whether a value is secretly a string.',
        },
      ],
    },

    {
      id: 'ch03-l04',
      title: 'Your First Real Code',
      concept: 'Print things with `console.log` and run code for real.',
      baseXp: 50,
      intro: [
        '`console.log(...)` prints whatever you put in the brackets. It is how a program talks to you, and it is the tool you will use most while learning.',
        'The next questions have a real editor. Write JavaScript, press Run, and your code actually runs — mistakes included. Nothing can break; get it wrong as many times as you like.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'What does `console.log("hi")` do?',
          options: [
            'Prints `hi` to the console',
            'Creates a variable called hi',
            'Saves `hi` to a file',
            'Checks whether hi is correct',
          ],
          correctIndex: 0,
          explanation: 'It prints. Everything inside the brackets is what gets shown.',
        },
        {
          id: 'q2',
          kind: 'code',
          prompt: 'Print exactly this text: `Hello, world!`',
          starterCode: '// Write one line that prints:  Hello, world!\n\n',
          tests: [{ type: 'output', expectedLogs: ['Hello, world!'], description: 'Prints Hello, world!' }],
          solution: 'console.log("Hello, world!");',
          explanation:
            'You just ran a real program. `console.log("Hello, world!");` — that is the traditional first line of code for almost every programmer alive.',
          hints: [
            'Use `console.log(...)` with your text inside quotes.',
            'The text must match exactly, including the comma and the exclamation mark.',
          ],
        },
        {
          id: 'q3',
          kind: 'code',
          prompt: 'Print two separate lines: `Learning to code` and then `Day 1`.',
          starterCode: '// Two lines of output means two console.log calls.\n\n',
          tests: [
            {
              type: 'output',
              expectedLogs: ['Learning to code', 'Day 1'],
              description: 'Prints both lines, in order',
            },
          ],
          solution: 'console.log("Learning to code");\nconsole.log("Day 1");',
          explanation:
            'Each `console.log` produces its own line, and they run top to bottom — exactly the order idea from chapter 2, now in real code.',
          hints: ['One `console.log` per line of output.'],
        },
        {
          id: 'q4',
          kind: 'code',
          prompt:
            'Create a variable `name` holding `"Alex"`, then print it. Do not print the word directly — print the variable.',
          starterCode: '// 1. make a variable called name\n// 2. print it\n\n',
          tests: [{ type: 'output', expectedLogs: ['Alex'], description: 'Prints Alex' }],
          solution: 'let name = "Alex";\nconsole.log(name);',
          explanation:
            'Notice there are no quotes around `name` in the `console.log`. Quotes would print the word "name" itself; without them it prints what is in the box.',
          hints: [
            'Line one: `let name = "Alex";`',
            'Line two: put `name` inside console.log — with no quotes around it.',
          ],
        },
      ],
    },

    {
      id: 'ch03-l05',
      title: 'Changing What Is in the Box',
      concept: 'Reassigning replaces the old value completely.',
      baseXp: 50,
      intro: [
        'You use `let` once to create a variable. After that you change it by name alone: `score = 20;` — no `let` the second time.',
        'The old value is simply gone. A box holds one thing.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'let score = 10;\nscore = 20;\nconsole.log(score);',
          options: ['20', '10', '30', '1020'],
          correctIndex: 0,
          explanation: 'The second line replaced the contents. `10` is not recoverable.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'This line looks strange but is extremely common. What prints?',
          code: 'let count = 5;\ncount = count + 1;\nconsole.log(count);',
          options: ['6', '5', '51', 'Error'],
          correctIndex: 0,
          explanation:
            'Read right to left: work out `count + 1` (which is 6), then put it back into `count`. As maths it would be nonsense; as assignment it is ordinary.',
          hints: ['The right-hand side is calculated first, using the current value.'],
        },
        {
          id: 'q3',
          kind: 'fill-blank',
          prompt: 'Add 5 to the existing total, without creating a new variable.',
          template: 'let total = 100;\ntotal {{0}} total {{1}} 5;',
          blanks: [
            { choices: ['=', '==', 'let', '+'], correctIndex: 0 },
            { choices: ['+', '-', '=', '*'], correctIndex: 0 },
          ],
          explanation:
            '`total = total + 5;` — the shorthand `total += 5;` does the same thing and you will see it everywhere.',
        },
        {
          id: 'q4',
          kind: 'predict-output',
          prompt: 'Two variables, one change. What prints?',
          code: 'let a = 3;\nlet b = a;\na = 99;\nconsole.log(b);',
          options: ['3', '99', '102', 'undefined'],
          correctIndex: 0,
          explanation:
            '`b` copied the value `3` at that moment. It is a separate box, so changing `a` afterwards leaves `b` untouched.',
          hints: ['At the moment `b` was created, what number was actually copied into it?'],
        },
      ],
    },

    {
      id: 'ch03-l06',
      title: 'Joining Text Together',
      concept: 'Build sentences from variables with `+` or template strings.',
      baseXp: 50,
      intro: [
        'Joining strings is called concatenation, and `+` does it: `"Hello, " + name` gives `"Hello, Alex"`.',
        'Watch the spaces — they only exist if you put them inside the quotes. `"Hello," + name` gives `"Hello,Alex"`.',
        'There is a tidier way: backticks with `${...}` holes in them. `` `Hello, ${name}!` `` reads much closer to the sentence you want.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'let name = "Sam";\nconsole.log("Hi, " + name + "!");',
          options: ['Hi, Sam!', 'Hi, name!', 'Hi,Sam!', 'Hi, + Sam + !'],
          correctIndex: 0,
          explanation: 'The pieces are glued in order. The space after the comma was inside the quotes, so it survived.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'Count the spaces carefully.',
          code: 'let a = "good";\nlet b = "morning";\nconsole.log(a + b);',
          options: ['goodmorning', 'good morning', 'good + morning', 'ab'],
          correctIndex: 0,
          explanation:
            'No space appears by magic. You would need `a + " " + b` to get one.',
        },
        {
          id: 'q3',
          kind: 'fill-blank',
          prompt: 'Complete the template string so it prints `You have 3 messages`.',
          template: 'let count = 3;\nconsole.log(`You have {{0}}count{{1}} messages`);',
          blanks: [
            { choices: ['${', '{', '$', '<'], correctIndex: 0 },
            { choices: ['}', ')', '$', '>'], correctIndex: 0 },
          ],
          explanation:
            'Inside backticks, `${count}` is replaced by the value. Everything else in the string stays exactly as written.',
        },
        {
          id: 'q4',
          kind: 'code',
          prompt:
            'Given the two variables, print exactly: `Alex is 25 years old`',
          starterCode: 'let name = "Alex";\nlet age = 25;\n\n// print: Alex is 25 years old\n',
          tests: [
            { type: 'output', expectedLogs: ['Alex is 25 years old'], description: 'Prints the full sentence' },
          ],
          solution:
            'let name = "Alex";\nlet age = 25;\nconsole.log(`${name} is ${age} years old`);',
          explanation:
            'Either style works: `` `${name} is ${age} years old` `` or `name + " is " + age + " years old"`. The template version is easier to read, which is why most code uses it.',
          hints: [
            'Backticks ` ` ` are not the same key as quotes.',
            'Mind the spaces — "is" needs a space on each side.',
          ],
        },
      ],
    },

    {
      id: 'ch03-l07',
      title: 'const and let',
      concept: 'Use `const` unless the value genuinely has to change.',
      baseXp: 50,
      intro: [
        '`const` creates a variable that cannot be reassigned. Try to change it and the program stops with an error.',
        'That sounds like a restriction, and it is a useful one: most values never should change, and `const` turns a silent bug into a loud error. Habit worth forming: reach for `const` first, switch to `let` only when you must.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'What happens if you reassign a `const`?',
          options: [
            'The program stops with an error',
            'It changes quietly',
            'It changes but prints a warning',
            'Nothing at all happens',
          ],
          correctIndex: 0,
          explanation:
            '`TypeError: Assignment to constant variable.` You will see that message one day — now you will know exactly what it means.',
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt: 'Which should be a `const`?',
          options: [
            'The number of days in a week',
            'A running score in a game',
            'The current temperature reading',
            'The number of items in a basket',
          ],
          correctIndex: 0,
          explanation: 'Seven days a week, always. The other three are expected to change as the program runs.',
        },
        {
          id: 'q3',
          kind: 'true-false',
          prompt: 'You should use `let` for everything, just to be safe.',
          answer: false,
          explanation:
            'The opposite. `const` is the safe default — it documents your intent and catches accidental changes for free.',
        },
        {
          id: 'q4',
          kind: 'predict-output',
          prompt: 'What happens when this runs?',
          code: 'const limit = 10;\nlimit = 20;\nconsole.log(limit);',
          options: [
            'An error — a const cannot be reassigned',
            'It prints 20',
            'It prints 10',
            'It prints nothing and carries on',
          ],
          correctIndex: 0,
          explanation:
            'The program stops at line 2. Nothing after it runs — which is why the `console.log` never happens.',
        },
      ],
    },

    {
      id: 'ch03-l08',
      title: 'Put It Together',
      concept: 'Store values, calculate with them, print a result.',
      baseXp: 50,
      questions: [
        {
          id: 'q1',
          kind: 'code',
          prompt:
            'A shop sells 4 notebooks at 25 each. Store both numbers in variables, then print the total.',
          starterCode:
            '// price of one notebook: 25\n// how many: 4\n// print the total\n\n',
          tests: [{ type: 'output', expectedLogs: ['100'], description: 'Prints 100' }],
          solution:
            'const price = 25;\nconst quantity = 4;\nconsole.log(price * quantity);',
          explanation:
            'Storing the numbers first means the meaning is visible. `console.log(100)` would also print 100 — but it would not be a program, just an answer typed out.',
          hints: ['`*` multiplies.', 'Print the result of the multiplication, not the text "100".'],
        },
        {
          id: 'q2',
          kind: 'code',
          prompt:
            'Print exactly: `4 notebooks cost 100` — using the variables, not typed-out numbers.',
          starterCode: 'const price = 25;\nconst quantity = 4;\n\n// print: 4 notebooks cost 100\n',
          tests: [
            { type: 'output', expectedLogs: ['4 notebooks cost 100'], description: 'Prints the sentence' },
          ],
          solution:
            'const price = 25;\nconst quantity = 4;\nconsole.log(`${quantity} notebooks cost ${price * quantity}`);',
          explanation:
            'You can put a whole calculation inside `${...}`. Change `quantity` to 10 and the sentence updates itself — that is the payoff for using variables.',
          hints: ['A `${...}` hole can contain maths, not just a name.'],
        },
        {
          id: 'q3',
          kind: 'code',
          prompt:
            'A bill of 240 is split between 4 people, and each person adds a tip of 10. Print what one person pays.',
          starterCode: 'const bill = 240;\nconst people = 4;\nconst tip = 10;\n\n',
          tests: [{ type: 'output', expectedLogs: ['70'], description: 'Prints 70' }],
          solution:
            'const bill = 240;\nconst people = 4;\nconst tip = 10;\nconsole.log(bill / people + tip);',
          explanation:
            '240 ÷ 4 is 60, plus the 10 tip is 70. Division runs before addition — the same precedence rules you learned in school apply here.',
          hints: ['`/` divides.', 'Divide first, then add the tip.'],
        },
        {
          id: 'q4',
          kind: 'true-false',
          prompt: 'Using variables instead of typing numbers directly makes a program easier to change later.',
          answer: true,
          explanation:
            'Change one line at the top instead of hunting through the whole file. This is the entire reason variables exist.',
        },
      ],
    },

    {
      id: 'ch03-l09',
      title: 'Boss: Values and Names',
      concept: 'Everything about variables, tested together.',
      boss: true,
      baseXp: 150,
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'What prints?',
          code: 'let x = 2;\nx = x * 3;\nx = x + 4;\nconsole.log(x);',
          options: ['10', '9', '18', '24'],
          correctIndex: 0,
          explanation: '2 × 3 = 6, then 6 + 4 = 10. Track the box line by line and it is never a guess.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'Mind the quotes.',
          code: 'let a = 5;\nlet b = "5";\nconsole.log(a + b);',
          options: ['55', '10', '5', 'Error'],
          correctIndex: 0,
          explanation:
            'Mix a number with a string and JavaScript turns the number into text, then glues. This silent conversion causes real bugs — now you can spot it.',
          hints: ['One of these is text. What does `+` do when text is involved?'],
        },
        {
          id: 'q3',
          kind: 'fill-blank',
          prompt: 'Make a value that must never change, then print it.',
          template: '{{0}} PI = 3.14;\nconsole.{{1}}(PI);',
          blanks: [
            { choices: ['const', 'let', 'var', 'fixed'], correctIndex: 0 },
            { choices: ['log', 'print', 'show', 'write'], correctIndex: 0 },
          ],
          explanation: '`const` for values that stay put, `console.log` to print.',
        },
        {
          id: 'q4',
          kind: 'mcq',
          prompt: 'Which line creates a variable AND stores text in it?',
          options: [
            'let city = "Tokyo";',
            'let city = Tokyo;',
            'city = let "Tokyo";',
            'const "city" = Tokyo;',
          ],
          correctIndex: 0,
          explanation:
            'Without the quotes, `Tokyo` would be read as another variable name — and JavaScript would complain that it does not exist.',
        },
        {
          id: 'q5',
          kind: 'code',
          prompt:
            'You worked 8 hours at 150 per hour. Print exactly: `I earned 1200`',
          starterCode: 'const hours = 8;\nconst rate = 150;\n\n',
          tests: [{ type: 'output', expectedLogs: ['I earned 1200'], description: 'Prints I earned 1200' }],
          solution:
            'const hours = 8;\nconst rate = 150;\nconsole.log(`I earned ${hours * rate}`);',
          explanation:
            'Text and a calculation in one line. You are now doing everything chapter 3 set out to teach.',
          hints: ['Put the multiplication inside `${...}`.'],
        },
        {
          id: 'q6',
          kind: 'code',
          prompt:
            'Swap the two values so that `a` holds 2 and `b` holds 1, then print them on two lines: first `2`, then `1`. You will need a third variable.',
          starterCode: 'let a = 1;\nlet b = 2;\n\n// swap them, then print a and then b\n',
          tests: [
            { type: 'output', expectedLogs: ['2', '1'], description: 'Prints 2 then 1' },
          ],
          solution:
            'let a = 1;\nlet b = 2;\nlet temp = a;\na = b;\nb = temp;\nconsole.log(a);\nconsole.log(b);',
          explanation:
            'Without the temporary variable, `a = b` would overwrite `a` before you had saved it — and both would end up as 2. Parking a value somewhere safe before overwriting it is a trick you will reuse constantly.',
          hints: [
            'If you write `a = b` first, the original value of `a` is lost forever.',
            'Save `a` into a third variable before you overwrite it.',
          ],
        },
      ],
    },
  ],
};
