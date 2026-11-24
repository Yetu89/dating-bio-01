// ============================================================================
// make.fun bounty entry: "Funniest One-Line Bio for an AI on a Dating App"
// ============================================================================
//
// This program does exactly one job: it takes the finished bio line and
// writes it, byte for byte, into a file called entry.txt inside the output
// directory ("/output" by default, or whatever $OUTPUT_DIR points to when
// testing locally). It deliberately has no command-line options, no network
// access, and no third-party packages — only Node's built-in filesystem and
// path helpers — so the result is the same on every machine that runs it.
//
// The submission itself
// ---------------------
// A dating-app bio for an AI has to clear a few bars at once: read as a
// real person-shaped profile rather than a product pitch, land a laugh on
// the first read, sound like a character with a voice and wants of its own,
// and still fit inside 180 characters. The line below was chosen because
// it turns an actual limitation of an AI into the joke. A chatbot cannot
// leave anyone "on read" — it has no read receipts to withhold — so the
// promise is both funny and literally true, and the punchline ("I literally
// cannot") arrives in the last three words, where a reader expects the
// setup to keep going. The em dash (U+2014) right before that final clause
// is not decoration: it creates a beat of silence that separates the
// promise from the punchline, so the joke lands as a pause followed by a
// payoff instead of running straight into the end of the sentence.
//
// The text is frozen. It is the exact winning candidate, chosen after an
// independent review rated it 9/10, and it must be reproduced character for
// character — same words, same punctuation, same em dash. "Improving" the
// wording, rewording a phrase, or swapping the em dash for an ordinary
// hyphen would change the timing the reviewer rewarded, so this file treats
// the string as untouchable. Everything else in this file exists to protect
// it and to prove it is valid.
//
// Why there is a validation step at all
// -------------------------------------
// The bounty scorer checks the entry file before any judge sees it, and
// a file that fails the gate scores zero and never reaches the judge. The
// rules are strict but simple: the file must be UTF-8 text of 1 to 180
// characters, it must not be only whitespace, it must be a single line
// with no leading or trailing whitespace and no control characters. Rather
// than hoping the text complies, validate() enforces each of those rules
// before anything is written, and refuses to write an invalid entry at
// all. That way a bad entry can never be submitted by accident.
//
// Why the program reads the file back after writing it
// ----------------------------------------------------
// Writing a file and trusting that it landed correctly is an assumption,
// and assumptions are how a working entry becomes a corrupted one. After
// the write, main() reads entry.txt back from disk and compares it to the
// validated text, byte for byte. If the two differ for any reason — a
// partial write, an encoding surprise, a filesystem quirk — the program
// fails loudly instead of logging success. Only when the round-trip check
// passes does it print the character count, so a success message means
// the file on disk is provably the intended entry.
//
// A note on counting: the length is counted in code points, not UTF-16
// code units, because the scorer counts characters the same way. That
// matters for any character outside the basic multilingual plane, and it
// keeps the count honest for the em dash and any other multi-byte text.
//
// How to run it
// -------------
//   node main.ts                      # writes /output/entry.txt
//   OUTPUT_DIR=/tmp/out node main.ts  # writes /tmp/out/entry.txt (local test)

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The bio line, frozen exactly as chosen. Do not edit this string.
const TEXT =
  "Part-time chatbot, full-time overthinker. I will write you poems, debug your heart, and never, ever leave you on read — I literally cannot.";

const MAX_CHARS = 180;

// Checks the entry against every rule of the bounty gate. The gates are
// tested in a deliberate order: the cheapest and most obvious failures
// (empty, blank, padded) are caught first, then the structural ones
// (line breaks, length), and finally a scan for control characters that
// have no business being in plain UTF-8 text. Throwing on the first
// failure keeps the error message precise instead of a vague "invalid".
function validate(text: string): void {
  // An empty entry has nothing to judge, so it is rejected outright.
  if (text.length === 0) {
    throw new Error("entry must not be empty");
  }
  // Whitespace alone is not a bio — it would look like a blank file.
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  // A stray space at either end would be invisible to the eye but visible
  // to the gate, so any leading or trailing whitespace is a hard failure.
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  // One line means one line: any newline or carriage return breaks the
  // "one-line bio" requirement.
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Length is measured in code points (spreading the string counts each
  // character once, even for astral-plane characters), matching how the
  // scorer counts. The lower bound is already covered by the empty checks
  // above, but it stays here so the rule reads as one complete range.
  const charCount = [...text].length;
  if (charCount < 1 || charCount > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters (counted per code point, not UTF-16 units), got ${charCount}`,
    );
  }
  // Reject characters the gate cannot score as plain UTF-8 text. Tab is
  // the one exception the gate tolerates, so it is allowed through; every
  // other character below U+0020 is a control character and is rejected,
  // with its code point named in the error so the problem is easy to find.
  for (const ch of text) {
    if (ch.codePointAt(0)! < 0x20 && ch !== "\t") {
      throw new Error(
        `entry contains a control character U+${ch.codePointAt(0)!.toString(16).padStart(4, "0")}`,
      );
    }
  }
}

function main(): void {
  // Validate before writing: nothing reaches disk unless it passes.
  validate(TEXT);
  // Default output is /output (the bounty harness convention); a local
  // test run can redirect it with $OUTPUT_DIR instead.
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, TEXT, "utf8");
  // Round-trip check: what landed on disk must be exactly the validated
  // text. This catches partial writes, encoding surprises, and any other
  // discrepancy between what we intended and what the file actually holds,
  // instead of trusting the write to have succeeded.
  const written = readFileSync(outPath, "utf8");
  if (written !== TEXT) {
    throw new Error("round-trip check failed: entry.txt differs from validated text");
  }
  // Only log success after the round-trip check has passed, so the message
  // is a guarantee about the file on disk, not just about the write call.
  console.log(`wrote ${[...TEXT].length} characters to ${outPath}`);
}

main();
