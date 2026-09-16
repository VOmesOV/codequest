# CodeQuest

A level-based game that teaches programming from absolute zero up to writing real JavaScript.
Built for someone with no computer background: the first two chapters contain no code at all,
and by chapter 8 the player is writing functions that are executed and checked against test cases.

No accounts, no server. Progress lives in `localStorage`.

## Running it

```bash
npm install
```

```bash
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server at http://localhost:5173 |
| `npm run build` | Type-check then build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm test` | Unit tests + the content lint |

## Playing on a phone

Both `dev` and `preview` run with `--host`, so they also listen on your local
network. On startup Vite prints a second address next to **Network**, like
`http://192.168.1.38:5173/` — open that on a phone that is on the **same Wi-Fi**.

Two things that commonly get in the way:

- **Windows Firewall** may ask to allow Node.js the first time. It has to be allowed
  on *private* networks, or the phone cannot reach the server.
- A **guest network**, or "client isolation" on the router, blocks devices from seeing
  each other. Put both devices on the normal Wi-Fi.

This exposes the server to your local network only — not to the internet.

For the smoothest experience, use `npm run build` then `npm run preview`: the phone
gets the optimised build instead of the dev server's unbundled modules.

Once it is open, **Add to Home Screen** installs it as a standalone app (there is a web
manifest and an icon), which drops the browser chrome and gives the game the full screen.

## Playing away from home

There is no backend, no database and no accounts — the whole game is static files, and
progress lives in the browser. So it does not need a *server* in the sense of something to
rent and maintain; it needs somewhere to put the files. Any free static host works:

It is published to GitHub Pages at **https://vomesov.github.io/codequest/**. To publish
the current code:

```bash
npm run deploy
```

That runs the tests, builds, and force-pushes `dist/` as the single commit on the
`gh-pages` branch; Pages serves that branch. A failing test stops the deploy, so a broken
level never goes live. It only needs normal push access.

(Deploying automatically on every push via GitHub Actions would also work, but pushing a
workflow file from the GitHub CLI needs the extra `workflow` permission:
`gh auth refresh -h github.com -s workflow`.)

Any other static host works too — publish the `dist/` folder from `npm run build`.
`base` is `'./'`, so the build works at the root of a domain or in a subfolder without
changes.

Once it has been opened once from such a host, **it works with no signal at all** — on a
train, a plane, underground. A service worker precaches every asset, including the
lazily-loaded editor and the sandbox worker.

### Why the home Wi-Fi address cannot do this

It is tempting to load the game over the LAN address at home and expect it to stay cached
once you leave. Browsers do not allow it: service workers require a *secure context*, and
`http://192.168.x.x` is not one — the `navigator.serviceWorker` API is not merely blocked
there, it is absent. `localhost` is exempt, which is why offline can be tested locally with
`npm run preview` but never over the LAN URL.

So: the LAN URL is for playing at home, and a hosted HTTPS URL is for everywhere else.

### What is different on a touch device

Everything below keys off `@media (hover: none)`, so a desktop is untouched:

- **A symbol keypad above the Run button.** Phone keyboards bury `{`, `}`, `;` and `$`
  two layers deep, so the characters this curriculum needs are one tap away, with `←`/`→`
  to step the caret out from between brackets. Tapping a key never closes the keyboard.
- The editor renders at **16px**, below which iOS zooms the page on focus and never zooms back.
- The **fixed footer hides while the editor has focus**, so the on-screen keyboard is not
  fighting it for the bottom of the screen.
- Tap targets are at least ~44px, the tap-delay and double-tap-zoom gestures are off, and
  the layout respects the notch and home indicator via `env(safe-area-inset-*)`.
- Pull-to-refresh is contained, so a stray downward swipe cannot reload mid-level.

## How it is put together

```
src/
  types/content.ts     The contract every level is written against
  content/             8 chapters, one file each, listed in content/index.ts
  engine/              grading.ts (pure answer checking), levelEngine.ts (the in-level state machine)
  runner/              The code sandbox: a throwaway Worker the main thread can kill
  state/               localStorage persistence + the React context around it
  components/          Map screen, level player, one renderer per question kind
```

The engine knows nothing about any particular level. Content is plain data, so adding
material never means touching game logic.

### The six question kinds

| Kind | What the player does |
| --- | --- |
| `mcq` | Picks one of several options |
| `true-false` | Decides whether a statement holds |
| `predict-output` | Reads a snippet and says what it prints |
| `order` | Clicks steps into the right sequence |
| `fill-blank` | Fills `{{0}}` slots from a word bank |
| `code` | Writes real JavaScript, which is run and tested |

### How code challenges are checked

Two kinds of test:

- `output` — compares everything the program printed, line by line.
- `function` — calls a function the player defined with several sets of arguments and
  compares the return values. Objects and arrays compare by value, so key order does not matter.

The player's code runs in a **fresh Web Worker per run**, with the main thread terminating it
after 2 seconds. That is the only reliable way to stop a `while (true) {}` — and chapter 5
deliberately teaches that mistake, so the player will hit it.

## Adding content

Adding a level is one object in one file:

```ts
// src/content/chapter-03.ts
{
  id: 'ch03-l10',              // must be globally unique
  title: 'Template Strings',
  concept: 'One line the player walks away knowing.',
  baseXp: 50,                  // 150 for a boss, 250 for the final one
  intro: ['Optional teaching cards, shown before the questions.'],
  questions: [
    {
      id: 'q1',
      kind: 'mcq',
      prompt: 'Backticks let you...',      // `backticks` render as inline code
      options: ['Embed values with ${}', 'Nothing special'],
      correctIndex: 0,
      explanation: 'Always teach something here — it shows after a correct answer.',
      hints: ['Revealed one at a time; each costs points, never progress.'],
    },
  ],
}
```

Adding a chapter is a new file plus one line in `src/content/index.ts`. Array order is
progression order, and because each chapter's boss is its last level, the chapter gate
falls out of the ordering for free.

**Run `npm test` after writing content.** The content lint checks that ids are unique, that
every `correctIndex` points at a real option, that fill-in-the-blank templates match their
word banks, that each chapter ends in exactly one boss — and, most importantly, it
**executes every authored `solution` against that question's own tests**, and checks that the
starter code does *not* already pass.

## Game rules

- **Unlimited retries.** You always finish a level; retries and hints cost stars, never progress.
- **Scoring.** 100 points for a first-try answer with no hints, −25 per retry or hint, floor of 25.
  Revealing the worked answer on a code challenge scores 0 for that question.
- **Stars.** 3 at 90% average, 2 at 60%, 1 for finishing. Replaying can only ever improve them.
- **XP.** Awarded on the improvement over your previous best, so replaying an easy level earns nothing.

## Keyboard

| Key | Action |
| --- | --- |
| `1`–`4` | Pick an option |
| `Enter` | Check the answer, or continue once it is right |
| `Ctrl`+`Enter` | Run code (inside the editor) |

On a touch device these shortcuts are hidden rather than advertised — there is no Ctrl key
on a phone, and every action has a button.
