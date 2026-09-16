import type { Chapter } from '../types/content';

export const chapter02: Chapter = {
  id: 'ch02',
  title: 'Steps and Algorithms',
  description: 'Thinking in ordered steps — the skill under all code, practised without code.',
  icon: '🪜',
  levels: [
    {
      id: 'ch02-l01',
      title: 'Order Matters',
      concept: 'The same steps in a different order give a different result.',
      baseXp: 50,
      intro: [
        'An algorithm is just a list of steps that solves a problem. You already write them: recipes, directions, assembly instructions.',
        'The catch is that order is part of the meaning. "Put on socks, put on shoes" and "put on shoes, put on socks" contain identical steps and produce very different mornings.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'order',
          prompt: 'Put these steps in a sensible order.',
          items: [
            'Take the toothbrush',
            'Put toothpaste on the brush',
            'Brush your teeth',
            'Rinse your mouth',
          ],
          explanation:
            'Each step depends on the one before it. That dependency is what fixes the order.',
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt:
            'A program does: (1) send the email, (2) check the address is valid. What is wrong?',
          options: [
            'The check happens after the email has already gone out',
            'Nothing — both steps are present',
            'Emails cannot be checked',
            'There are too few steps',
          ],
          correctIndex: 0,
          explanation:
            'Both steps exist, and the program is still broken. Having the right steps is not enough; they have to be in the right order.',
        },
        {
          id: 'q3',
          kind: 'order',
          prompt: 'Order the steps for withdrawing cash from an ATM.',
          items: [
            'Insert the card',
            'Type the PIN',
            'Choose the amount',
            'Take the cash and the card',
          ],
          explanation:
            'Notice how each step unlocks the next. The machine cannot ask for an amount before it knows who you are.',
        },
        {
          id: 'q4',
          kind: 'true-false',
          prompt: 'Two algorithms with identical steps always produce the same result.',
          answer: false,
          explanation: 'Only if the steps are in the same order. Order is part of the algorithm.',
        },
      ],
    },

    {
      id: 'ch02-l02',
      title: 'Algorithms You Already Use',
      concept: 'Recognise everyday processes as algorithms.',
      baseXp: 50,
      intro: [
        'You have followed thousands of algorithms without calling them that: recipes, flat-pack furniture instructions, the route you take home.',
        'What makes something an algorithm is that it is repeatable and finishes. Follow it twice with the same starting point and you get the same result.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'Which of these is NOT an algorithm?',
          options: [
            '"Be more creative."',
            'A recipe for bread',
            'Instructions for tying a shoelace',
            'Steps for changing a tyre',
          ],
          correctIndex: 0,
          explanation:
            '"Be more creative" is a wish, not a procedure. An algorithm tells you exactly what to do at each step.',
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt: 'What must every algorithm do?',
          options: [
            'Finish after a limited number of steps',
            'Use at least ten steps',
            'Involve numbers',
            'Be written in English',
          ],
          correctIndex: 0,
          explanation:
            'An instruction list that never ends solves nothing. Finishing is part of the definition — and later you will meet loops that forget to.',
        },
        {
          id: 'q3',
          kind: 'order',
          prompt: 'Order the algorithm for making a cup of tea.',
          items: [
            'Boil the water',
            'Put a tea bag in the cup',
            'Pour the water into the cup',
            'Wait three minutes',
            'Remove the tea bag',
          ],
          explanation:
            'Some steps could swap (the bag could go in while the kettle boils), but pouring before boiling would not work.',
        },
        {
          id: 'q4',
          kind: 'true-false',
          prompt: 'Following the same algorithm twice with the same input gives the same result.',
          answer: true,
          explanation:
            'That predictability is exactly what makes algorithms useful — and what makes a program you can trust.',
        },
      ],
    },

    {
      id: 'ch02-l03',
      title: 'Being Precise',
      concept: 'Turn vague human steps into machine-followable ones.',
      baseXp: 50,
      intro: [
        'Human instructions lean on shared knowledge. "Add a bit of salt" works for a person and is useless to a machine.',
        'Turning "a bit of salt" into "add 5 grams of salt" is the everyday work of programming.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'Which version can a machine follow?',
          options: [
            'Heat the oven to 180 degrees Celsius',
            'Heat the oven until it is hot enough',
            'Warm it up nicely',
            'Get the oven going',
          ],
          correctIndex: 0,
          explanation:
            'A number and a unit. "Hot enough" requires judgement the machine does not have.',
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt: 'What is wrong with: "Keep adding water until the soup tastes right"?',
          options: [
            '"Tastes right" cannot be measured by a machine',
            'Soup cannot contain water',
            'It uses too many words',
            'Nothing is wrong with it',
          ],
          correctIndex: 0,
          explanation:
            'A machine can check "is the volume 500 ml?" It cannot check "does it taste right?" Every condition in a program has to be measurable.',
        },
        {
          id: 'q3',
          kind: 'order',
          prompt:
            'A robot must cross a road safely. Order the steps.',
          items: [
            'Walk to the edge of the pavement',
            'Look left, then right',
            'Check that no car is approaching',
            'Walk straight across',
          ],
          explanation:
            'Looking must come before deciding, and deciding before walking. Safety checks belong before the action, never after.',
        },
        {
          id: 'q4',
          kind: 'mcq',
          prompt:
            'Instruction: "Sort the books." A literal machine asks one question first. Which?',
          options: [
            'Sort them by what — title, author, size, colour?',
            'What is a book?',
            'How fast should I sort?',
            'Should I enjoy it?',
          ],
          correctIndex: 0,
          explanation:
            'You know "sort the books" means something sensible. The machine has no preference at all, so you must supply the rule.',
        },
      ],
    },

    {
      id: 'ch02-l04',
      title: 'Reading Steps Top to Bottom',
      concept: 'A program runs one line at a time, downwards.',
      baseXp: 50,
      intro: [
        'A program runs from the top line to the bottom line, one at a time. Nothing is skipped and nothing runs early unless you specifically say so.',
        'These are written as pseudocode — plain-English steps in the shape of real code. Read each line, keep track of the values, and you can predict the result.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'predict-output',
          prompt: 'Follow the steps. What does the program show?',
          code: 'set basket to 3\nadd 2 to basket\nshow basket',
          options: ['5', '3', '2', '32'],
          correctIndex: 0,
          explanation:
            'Line 1 puts 3 in the basket, line 2 makes it 5, line 3 shows it. Reading top to bottom, tracking the value, is a skill you will use forever.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'What does this show?',
          code: 'set price to 100\nset price to 40\nshow price',
          options: ['40', '100', '140', '60'],
          correctIndex: 0,
          explanation:
            'The second line replaces the value entirely. The old 100 is gone — nothing is remembered unless you store it somewhere else.',
        },
        {
          id: 'q3',
          kind: 'predict-output',
          prompt: 'Careful with the order here.',
          code: 'set total to 10\nshow total\nadd 5 to total',
          options: ['10', '15', '5', 'nothing'],
          correctIndex: 0,
          explanation:
            'The display happens on line 2, before line 3 changes anything. A correct-looking program can still show a stale value if the order is off.',
        },
        {
          id: 'q4',
          kind: 'mcq',
          prompt: 'In what order does a computer run the lines of a simple program?',
          options: [
            'From the first line to the last, one at a time',
            'All at once, in parallel',
            'Starting with the most important line',
            'In a random order each run',
          ],
          correctIndex: 0,
          explanation:
            'Top to bottom, one line at a time. Everything else you learn — conditions, loops, functions — is a controlled exception to this rule.',
        },
      ],
    },

    {
      id: 'ch02-l05',
      title: 'Finding the Broken Step',
      concept: 'Locate the exact step where a process goes wrong.',
      baseXp: 50,
      intro: [
        'Debugging means finding the one step that is wrong. The skill is not staring harder — it is walking through the steps slowly and asking "is this still correct?" at each one.',
        'The first step that produces something you did not expect is where the bug lives.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt:
            'Steps: (1) crack the eggs into the bowl, (2) beat the eggs, (3) remove the shells from the bowl, (4) pour into the pan. Which step is misplaced?',
          options: [
            'Step 3 — shells should come out before beating',
            'Step 1 — eggs go in the pan first',
            'Step 4 — pouring is unnecessary',
            'Step 2 — beating is optional',
          ],
          correctIndex: 0,
          explanation:
            'Every step is individually reasonable. The bug is purely in the ordering — which is exactly how a lot of real bugs look.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt:
            'This should show the total price of 2 items at 50 each. It shows the wrong number. What does it show?',
          code: 'set price to 50\nset total to price\nset count to 2\nshow total',
          options: ['50', '100', '2', '52'],
          correctIndex: 0,
          explanation:
            'It never multiplies. `total` was set to one price and the count was captured but never used — a missing step, not a wrong one.',
          hints: ['Look for the step that multiplies. Is it actually there?'],
        },
        {
          id: 'q3',
          kind: 'mcq',
          prompt:
            'A login process: (1) ask for the password, (2) let the user in, (3) check the password. What is the bug?',
          options: [
            'The check happens after the user is already in',
            'The password is asked for too early',
            'There should be no check',
            'Step 1 and 2 should be merged',
          ],
          correctIndex: 0,
          explanation:
            'Checks must come before the action they guard. This exact mistake is behind a surprising number of real security holes.',
        },
        {
          id: 'q4',
          kind: 'order',
          prompt: 'Fix the login process by putting the steps in the right order.',
          items: [
            'Ask for the password',
            'Check the password against the stored one',
            'If it matches, let the user in',
          ],
          explanation: 'Ask, check, then act. Never act before checking.',
        },
      ],
    },

    {
      id: 'ch02-l06',
      title: 'Repeating Yourself',
      concept: 'Spot when steps repeat — the intuition behind loops.',
      baseXp: 50,
      intro: [
        'Suppose you must wash 20 plates. Nobody writes 20 separate instructions. You write one: "for each dirty plate, wash it".',
        'That idea is called a loop, and it is coming in a later chapter. For now just practise noticing when steps repeat.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'You must greet 500 guests by name. What is the sensible instruction?',
          options: [
            '"For each guest in the list: say hello and their name"',
            'Write 500 separate greeting instructions',
            'Greet only the first guest',
            'Ask the guests to greet themselves',
          ],
          correctIndex: 0,
          explanation:
            'One instruction that repeats beats 500 copies. It is shorter, and if the greeting changes you fix it in exactly one place.',
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt: 'What must every repeated process have to avoid running forever?',
          options: [
            'A condition that eventually becomes false',
            'At least three steps',
            'A number in it',
            'A person watching it',
          ],
          correctIndex: 0,
          explanation:
            '"While there are dirty plates" stops when the sink empties. A loop with no way to end is a program that hangs.',
        },
        {
          id: 'q3',
          kind: 'predict-output',
          prompt: 'How many times does this show a line?',
          code: 'set count to 1\nrepeat while count is 3 or less:\n    show count\n    add 1 to count',
          options: ['3 times', '2 times', '4 times', 'forever'],
          correctIndex: 0,
          explanation:
            'count is 1, 2, 3 — three passes. On the fourth check count is 4, the condition fails, and the loop stops.',
          hints: ['Write down count after each pass: 1 → 2 → 3 → 4. When does it stop being "3 or less"?'],
        },
        {
          id: 'q4',
          kind: 'true-false',
          prompt: 'A repeated process that never changes its condition will run forever.',
          answer: true,
          explanation:
            'If nothing inside the loop moves it towards ending, it never ends. You will meet this for real — and this game stops such code after 2 seconds.',
        },
      ],
    },

    {
      id: 'ch02-l07',
      title: 'Boss: Think Like a Machine',
      concept: 'Order, precision, repetition and bug-hunting, all at once.',
      boss: true,
      baseXp: 150,
      questions: [
        {
          id: 'q1',
          kind: 'order',
          prompt: 'Order the algorithm for sending a parcel.',
          items: [
            'Put the item in the box',
            'Seal the box',
            'Write the address on it',
            'Hand it to the post office',
          ],
          explanation: 'Sealing before addressing is fine; addressing before filling it is not.',
        },
        {
          id: 'q2',
          kind: 'predict-output',
          prompt: 'What does this show?',
          code: 'set a to 4\nset b to a\nset a to 9\nshow b',
          options: ['4', '9', '13', 'nothing'],
          correctIndex: 0,
          explanation:
            '`b` copied the value 4 at that moment. Changing `a` afterwards does not reach back and change `b` — copies are independent.',
          hints: ['When b was set, what was in a at that exact moment?'],
        },
        {
          id: 'q3',
          kind: 'mcq',
          prompt:
            'Steps: (1) take money from the account, (2) check the balance is high enough. What is the bug?',
          options: [
            'The check comes after the money is gone',
            'Money cannot be taken from accounts',
            'The balance never needs checking',
            'Step 1 should be repeated',
          ],
          correctIndex: 0,
          explanation: 'Check first, act second. Always.',
        },
        {
          id: 'q4',
          kind: 'mcq',
          prompt: 'Which instruction is precise enough to program?',
          options: [
            'If the temperature is above 30, turn on the fan',
            'If it gets hot, do something about it',
            'Keep the room comfortable',
            'React to the weather sensibly',
          ],
          correctIndex: 0,
          explanation:
            'A measurable condition and a definite action. That shape — "if this exact thing, do that exact thing" — is the next chapter but one.',
        },
        {
          id: 'q5',
          kind: 'predict-output',
          prompt: 'What is the final value shown?',
          code: 'set score to 0\nrepeat 3 times:\n    add 10 to score\nshow score',
          options: ['30', '10', '3', '0'],
          correctIndex: 0,
          explanation: '10 added three times. Loops build up values a step at a time.',
        },
        {
          id: 'q6',
          kind: 'true-false',
          prompt:
            'If a program has all the right steps, it will work no matter what order they are in.',
          answer: false,
          explanation:
            'You have now seen three bugs in this chapter that were purely about order. Right steps, wrong order, broken program.',
        },
      ],
    },
  ],
};
