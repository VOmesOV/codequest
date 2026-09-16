/**
 * Publishes the game to GitHub Pages: `npm run deploy`.
 *
 * Tests, builds, then force-pushes the contents of dist/ as the only commit on
 * the `gh-pages` branch. It needs nothing beyond ordinary push access — unlike
 * a GitHub Actions workflow, which a CLI login can only push with the extra
 * `workflow` permission.
 */
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const run = (command, args, options = {}) =>
  execFileSync(command, args, { stdio: 'inherit', ...options });
const read = (command, args) => execFileSync(command, args, { encoding: 'utf8' }).trim();

// npm is `npm.cmd` on Windows, which Node will only launch through a shell. Git
// must NOT go through one: the shell would split a commit message on spaces.
const npm = (...args) => run('npm', args, { shell: process.platform === 'win32' });

const remote = read('git', ['remote', 'get-url', 'origin']);
const name = read('git', ['config', 'user.name']);
const email = read('git', ['config', 'user.email']);
const sourceCommit = read('git', ['rev-parse', '--short', 'HEAD']);

// A broken level must never reach the live site: the content lint executes every
// authored solution against its own tests.
npm('test');
npm('run', 'build');

const stage = mkdtempSync(join(tmpdir(), 'codequest-pages-'));
try {
  cpSync('dist', stage, { recursive: true });
  // Without this, Pages runs the site through Jekyll, which drops any file or
  // folder whose name starts with an underscore.
  writeFileSync(join(stage, '.nojekyll'), '');

  const git = (...args) =>
    run('git', ['-c', `user.name=${name}`, '-c', `user.email=${email}`, ...args], { cwd: stage });
  git('init', '-q', '-b', 'gh-pages');
  git('add', '-A');
  git('commit', '-q', '-m', `Deploy ${sourceCommit}`);
  git('push', '--force', '-q', remote, 'gh-pages');

  console.log(`\nDeployed ${sourceCommit} to the gh-pages branch.`);
} finally {
  rmSync(stage, { recursive: true, force: true });
}
