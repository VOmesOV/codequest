import type { Chapter } from '../types/content';

export const chapter01: Chapter = {
  id: 'ch01',
  title: 'How Computers Think',
  description: 'No code yet. Just the handful of ideas everything else is built on.',
  icon: '🧠',
  levels: [
    {
      id: 'ch01-l01',
      title: 'What a Computer Really Does',
      concept: 'A computer follows simple instructions, very fast.',
      baseXp: 50,
      intro: [
        'A computer looks clever, but it is not. It can only do a few very simple things: store numbers, compare them, and follow instructions it was given.',
        'What makes it feel magical is speed. A normal laptop follows billions of tiny steps every second. Every video, game and chat app you have ever used is built out of those tiny steps.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'Which of these is closest to what a computer actually does?',
          options: [
            'Follows simple instructions, extremely fast',
            'Understands what you want and figures out the rest',
            'Guesses answers from past experience',
            'Reads your intentions through the keyboard',
          ],
          correctIndex: 0,
          explanation:
            'A computer has no understanding and no intentions. It follows the instructions it was given, one after another, very fast.',
        },
        {
          id: 'q2',
          kind: 'true-false',
          prompt: 'If your instructions are wrong, a computer will work out what you really meant.',
          answer: false,
          explanation:
            'It will do exactly the wrong thing you asked for, without hesitating. This is the single most important fact about programming.',
          hints: ['Think about the last time a machine did something obviously silly.'],
        },
        {
          id: 'q3',
          kind: 'mcq',
          prompt: 'Which task is a computer genuinely best at?',
          options: [
            'Repeating the same task 10,000 times without ever getting bored or careless',
            'Deciding whether a painting is beautiful',
            'Knowing when a friend is upset',
            'Inventing a joke nobody has heard before',
          ],
          correctIndex: 0,
          explanation:
            'Speed plus perfect repetition is the whole superpower. Judgement, taste and feelings are still yours.',
        },
        {
          id: 'q4',
          kind: 'mcq',
          prompt:
            'A computer runs about 3,000,000,000 simple steps per second. Why does that matter to you as a beginner?',
          options: [
            'Because a solution built from very simple steps can still be fast enough',
            'Because you must write 3 billion instructions',
            'Because slow instructions are not allowed',
            'Because it means the computer can skip steps',
          ],
          correctIndex: 0,
          explanation:
            'You never have to be clever to be fast. You write a handful of simple steps, and the machine repeats them at an absurd rate.',
        },
      ],
    },

    {
      id: 'ch01-l02',
      title: 'What Is a Program?',
      concept: 'A program is written-down instructions a computer can follow later.',
      baseXp: 50,
      intro: [
        'A program is a list of instructions, written down, so a machine can follow them later — without you standing there.',
        'A recipe is the everyday version. Someone wrote it once; anyone can follow it any number of times, and the writer does not need to be in the kitchen.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'What is a program?',
          options: [
            'Instructions written down so a computer can follow them later',
            'A picture of what the app should look like',
            'A description of a problem you would like solved',
            'A machine that comes up with its own instructions',
          ],
          correctIndex: 0,
          explanation:
            'Written down, and followable later, by a machine. That is the whole idea.',
        },
        {
          id: 'q2',
          kind: 'true-false',
          prompt: 'A program has to be re-typed by a person every time it runs.',
          answer: false,
          explanation:
            'You write it once. It can then run a million times, on a million machines, without you.',
        },
        {
          id: 'q3',
          kind: 'mcq',
          prompt: 'Which of these is a program?',
          options: [
            'The instructions that make your phone ring an alarm at 07:00',
            'The sound the alarm makes',
            'The glass screen of the phone',
            'Your decision to wake up',
          ],
          correctIndex: 0,
          explanation:
            'The sound is the result, the screen is hardware, waking up is you. The instructions behind the scenes are the program.',
        },
        {
          id: 'q4',
          kind: 'mcq',
          prompt: 'A programmer wrote an app two years ago and has since left the company. The app still works. How?',
          options: [
            'The instructions were written down, and the computer keeps following them',
            'The computer memorised what the programmer used to do',
            'The app rewrites itself each morning',
            'Someone must be secretly running it by hand',
          ],
          correctIndex: 0,
          explanation:
            'This is why programs are worth writing: they keep working long after the author has gone home.',
        },
      ],
    },

    {
      id: 'ch01-l03',
      title: 'Computers Are Painfully Literal',
      concept: 'Vague instructions produce nonsense — precision is the job.',
      baseXp: 50,
      intro: [
        'Imagine a robot that follows your instructions perfectly, but has zero common sense. You say "put the peanut butter on the bread". It puts the whole closed jar on top of the loaf.',
        'It is not being difficult. It did exactly what you said. Most of programming is learning to say exactly what you mean.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt:
            'You tell the robot: "Open the jar." It grips the jar and pulls the lid straight up, snapping it off. Whose mistake is it?',
          options: [
            'Yours — "open" did not say how',
            "The robot's — it should know how jars work",
            'Nobody\'s — the jar was faulty',
            'The jar manufacturer\'s',
          ],
          correctIndex: 0,
          explanation:
            'Blaming the machine is comfortable but useless. When the output is wrong, the instructions were wrong. That mindset will save you hours later.',
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt: 'Which instruction is precise enough for a machine?',
          options: [
            'Turn 90 degrees to the right, then walk forward 3 metres',
            'Head over towards the kitchen area',
            'Go roughly that way',
            'Move until it feels about right',
          ],
          correctIndex: 0,
          explanation:
            'Numbers and exact directions leave nothing to interpret. "Roughly" and "about right" mean nothing to a computer.',
        },
        {
          id: 'q3',
          kind: 'true-false',
          prompt:
            'When a program does something strange, the most likely explanation is that the computer made a mistake.',
          answer: false,
          explanation:
            'Almost always the instructions said something you did not intend. Start by suspecting your own code — you will be right nearly every time.',
        },
        {
          id: 'q4',
          kind: 'mcq',
          prompt:
            'A vending machine is told: "If the customer pays enough, give the drink." A customer pays double. What does a painfully literal machine do?',
          options: [
            'Gives the drink, and does nothing about the extra money — no one mentioned change',
            'Gives the drink and works out the change by itself',
            'Refuses, because the amount is unusual',
            'Gives two drinks',
          ],
          correctIndex: 0,
          explanation:
            'Anything you did not specify simply does not happen. Missing instructions are the most common kind of bug.',
        },
      ],
    },

    {
      id: 'ch01-l04',
      title: 'Input, Process, Output',
      concept: 'Every program takes something in, does work, and gives something back.',
      baseXp: 50,
      intro: [
        'Almost every program has the same three-part shape: it takes something IN (input), does some work on it (processing), and gives something BACK (output).',
        'A search box: you type words (input), the computer looks through its index (processing), a list of results appears (output). Once you see this shape, you see it everywhere.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'order',
          prompt: 'Put the three stages of a search in the order they happen.',
          items: [
            'You type "cheap flights" into the box (input)',
            'The computer searches its index for matches (processing)',
            'A list of results appears on screen (output)',
          ],
          explanation:
            'Input, then processing, then output. The order never changes — you cannot produce a result before you have something to work on.',
        },
        {
          id: 'q2',
          kind: 'mcq',
          prompt: 'In a calculator app, what is the OUTPUT?',
          options: [
            'The answer shown on the screen',
            'The numbers you tapped',
            'The addition being carried out',
            'The battery the app uses',
          ],
          correctIndex: 0,
          explanation:
            'The numbers you tapped are input, the addition is processing, the answer on screen is output.',
        },
        {
          id: 'q3',
          kind: 'mcq',
          prompt: 'A photo filter app makes a picture black and white. What is the INPUT?',
          options: [
            'The original colour photo',
            'The black and white photo',
            'The filter button',
            'The removal of colour',
          ],
          correctIndex: 0,
          explanation:
            'Input is what goes in: the original photo. Removing colour is the processing; the black and white image is the output.',
        },
        {
          id: 'q4',
          kind: 'true-false',
          prompt: 'A program can have input without producing any output that a human ever sees.',
          answer: true,
          explanation:
            'Plenty of programs quietly save a file, update a total or send a message. Output does not have to mean something on a screen.',
        },
      ],
    },

    {
      id: 'ch01-l05',
      title: 'Languages, and Why JavaScript',
      concept: 'Code is a strict written language that gets translated for the machine.',
      baseXp: 50,
      intro: [
        'A computer really only handles numbers. Writing instructions as raw numbers is unbearable, so we write in a programming language — strict, but readable by humans — and something translates it for the machine.',
        'This game teaches JavaScript. Two practical reasons: every web browser already runs it, so there is nothing to install, and it is the language behind most of what you click on the internet.',
      ],
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'Why do programming languages exist?',
          options: [
            'So humans can write instructions readably and have them translated for the machine',
            'Because computers prefer English to numbers',
            'To keep programming difficult for outsiders',
            'Because each country needs its own language for code',
          ],
          correctIndex: 0,
          explanation:
            'A programming language is a middle ground: strict enough to translate exactly, readable enough for a person to write.',
        },
        {
          id: 'q2',
          kind: 'true-false',
          prompt: 'You can write a program in ordinary English sentences.',
          answer: false,
          explanation:
            'English is full of ambiguity — "put it over there" has a dozen meanings. A programming language removes that ambiguity by force.',
        },
        {
          id: 'q3',
          kind: 'mcq',
          prompt: 'Where does JavaScript code run?',
          options: [
            'Inside a web browser — and on servers too',
            'Only on Apple devices',
            'Only after being printed out',
            'Only inside Microsoft Word',
          ],
          correctIndex: 0,
          explanation:
            'Every browser on your machine already has a JavaScript engine in it. That is why you can start writing real code in this game without installing anything.',
        },
        {
          id: 'q4',
          kind: 'mcq',
          prompt: 'A language is "strict about spelling and punctuation". What does that mean for you?',
          options: [
            'A missing bracket or a wrong capital letter will stop the program',
            'The computer will correct your typos for you',
            'Spelling matters only in comments',
            'Punctuation is optional in code',
          ],
          correctIndex: 0,
          explanation:
            'Typos are not a sign that you are bad at this — every programmer alive makes them daily. You will learn to read the error and fix it in seconds.',
        },
      ],
    },

    {
      id: 'ch01-l06',
      title: 'Boss: First Principles',
      concept: 'Prove you have the mental model before writing a line of code.',
      boss: true,
      baseXp: 150,
      questions: [
        {
          id: 'q1',
          kind: 'mcq',
          prompt: 'Which statement is true about computers?',
          options: [
            'They do exactly what they are told, very fast, with no understanding',
            'They understand goals and fill in missing steps',
            'They fix bad instructions automatically',
            'They learn what you meant after a few tries',
          ],
          correctIndex: 0,
          explanation: 'Exactly what they are told. No more, no less.',
        },
        {
          id: 'q2',
          kind: 'order',
          prompt: 'Put this program in order: an app that converts a temperature.',
          items: [
            'The user types 30 (input)',
            'The program multiplies by 9/5 and adds 32 (processing)',
            'The screen shows 86 (output)',
          ],
          explanation: 'Input, processing, output — the shape of almost every program you will write.',
        },
        {
          id: 'q3',
          kind: 'true-false',
          prompt: 'A program keeps working after the person who wrote it has left.',
          answer: true,
          explanation:
            'The instructions were written down. That permanence is precisely why programs are worth writing.',
        },
        {
          id: 'q4',
          kind: 'mcq',
          prompt:
            'Your program prints the wrong total. What should you suspect first?',
          options: [
            'Your own instructions',
            'A broken processor',
            'A faulty screen',
            'Bad luck',
          ],
          correctIndex: 0,
          explanation:
            'Suspect your code first, every time. Hardware faults are vanishingly rare compared to human mistakes.',
        },
        {
          id: 'q5',
          kind: 'mcq',
          prompt: 'Why does this game teach JavaScript first?',
          options: [
            'Every browser already runs it, so there is nothing to install',
            'It is the only language that exists',
            'It is the fastest language ever made',
            'Other languages cannot do loops',
          ],
          correctIndex: 0,
          explanation:
            'Zero setup means you spend your effort on ideas instead of on installing things. The ideas transfer to every other language later.',
        },
        {
          id: 'q6',
          kind: 'mcq',
          prompt:
            'A robot is told: "Pour milk into the cup." The cup is upside down. What happens?',
          options: [
            'It pours milk onto an upside-down cup, making a mess',
            'It turns the cup over first',
            'It refuses and asks for help',
            'It waits until someone fixes the cup',
          ],
          correctIndex: 0,
          explanation:
            'Nothing told it to check the cup. Everything a program should handle has to be written down — that habit of asking "what did I forget?" is the heart of the job.',
        },
      ],
    },
  ],
};
