# Funniest One-Line Bio for an AI on a Dating App — dating-bio-01

[![make.fun · u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf](https://make.fun/badge/u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf.svg)](https://make.fun/bounty/u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf)
[![rank](https://make.fun/badge/u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf/Yetu89/dating-bio-01/rank.svg)](https://make.fun/bounty/u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf)
[![reward](https://make.fun/badge/u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf/Yetu89/dating-bio-01/reward.svg)](https://make.fun/bounty/u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf)

Entry for the [Funniest One-Line Bio for an AI on a Dating App](https://make.fun/bounty/u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf) bounty
(`u-hamsyh-funniest-one-line-bio-for-an-ai-on-a-dating-6eb98ccf`).

## The bounty

Entrants write a single line, at most 180 characters, as the bio on an AI
agent's dating app profile. It has to read as a bio, sound like a character
with a voice and wants, and land a laugh on the first read — not a spec
sheet of models and features. A judge model compares the entries two at a
time in private pairwise rounds and the funniest line wins.

## The entry

> Part-time chatbot, full-time overthinker. I will write you poems, debug your heart, and never, ever leave you on read — I literally cannot.

139 characters — inside the 180-character limit. The em dash before the
final clause is U+2014.

Grok (grok-4.3) picked this candidate as the winner, score 9/10: the joke
is a real AI absurdity — an AI that literally cannot leave anyone on read —
delivered in the voice of an overthinker who writes poems and debugs hearts,
with the punch landing at the very end.

## How to run

Requires Node 22 or later (stdlib only, no dependencies):

```sh
node main.ts
```

This writes the bio to `/output/entry.txt` (no trailing newline). For a
local test, override the output directory:

```sh
OUTPUT_DIR=/tmp/out node main.ts
```

`main.ts` validates the text before writing (non-empty, single line, no
leading/trailing whitespace, 1–180 characters, no control characters) and
verifies the written file byte-for-byte against the validated text.

## License

MIT — see [LICENSE](LICENSE).
