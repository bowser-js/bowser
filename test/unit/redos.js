import test from 'ava';
import Bowser from '../../src/bowser';

/*
 * Regression tests for CodeQL js/polynomial-redos. Each input used to drive a
 * quadratic backtracking path; fixed, they parse in single-digit milliseconds,
 * so this budget has ~2 orders of magnitude of headroom and is not machine-sensitive.
 */
const TIME_BUDGET_MS = 500;

function timeParse(ua) {
  const startedAt = process.hrtime.bigint();
  Bowser.parse(ua);
  return Number(process.hrtime.bigint() - startedAt) / 1e6;
}

test('parses a Linespider UA made of repeated name tokens in linear time', (t) => {
  const ua = 'linespider-'.repeat(20000);
  const elapsed = timeParse(ua);
  t.true(elapsed < TIME_BUDGET_MS, `took ${elapsed.toFixed(0)}ms, budget ${TIME_BUDGET_MS}ms`);
});

test('parses a SlackBot UA made of repeated name tokens in linear time', (t) => {
  const ua = 'slackbot-'.repeat(20000);
  const elapsed = timeParse(ua);
  t.true(elapsed < TIME_BUDGET_MS, `took ${elapsed.toFixed(0)}ms, budget ${TIME_BUDGET_MS}ms`);
});

test('parses an unrecognised slash-heavy UA without a device spec in linear time', (t) => {
  const ua = `/${'/a'.repeat(60000)}`;
  const elapsed = timeParse(ua);
  t.true(elapsed < TIME_BUDGET_MS, `took ${elapsed.toFixed(0)}ms, budget ${TIME_BUDGET_MS}ms`);
});

test('parses an unrecognised slash-heavy UA with a device spec in linear time', (t) => {
  const ua = `/${'/a'.repeat(60000)}(`;
  const elapsed = timeParse(ua);
  t.true(elapsed < TIME_BUDGET_MS, `took ${elapsed.toFixed(0)}ms, budget ${TIME_BUDGET_MS}ms`);
});
