# A portfolio for the engineer-researcher who refuses to oversell

A design and build report — written so that the *site itself* becomes evidence of the values, not a description of them.

---

## 0. The one idea everything else hangs on

The person in the brief is defined by a single discipline: **claims must match what the work actually shows.** A portfolio is, by default, the most over-claiming genre on the web — its whole job is to make someone look good. So the interesting move is not to decorate that genre nicely. It's to *invert* it: build a portfolio whose credibility comes from how much it refuses to inflate.

That gives us a design thesis that is unusually easy to hold onto: **the medium has to obey the same standards as the work.** A site that says "I care about reproducibility and honest claims" while being a 4 MB animated template is self-refuting. A fast, accessible, mostly-static site that ships almost no JavaScript, states limitations before strengths, and links every claim to a receipt — *that* site argues for the person without saying a word about them.

Everything below is downstream of that. When a design decision is ambiguous, the tiebreaker is always: **does this make the site more honest, more reproducible, more precise — or just more impressive?** Choose the first every time, and the "impressive" takes care of itself for the audience that matters (research supervisors, conference reviewers, serious engineers).

---

## 1. Five design principles, each tied to a trait — and how each becomes UI

Generic portfolios describe qualities ("detail-oriented", "passionate about ML"). This one should *demonstrate* them through interface patterns. Five patterns do most of the work.

### 1.1 Claims carry receipts

Trait: *resists overselling; wants claims to match the evidence.*

Make this a literal rule of the site: **no strong sentence appears without a link to the thing that backs it.** "Reduced inference latency 3×" must be a link to the benchmark, the commit, or the deployed endpoint. Treat it like academic citation, but for engineering.

In practice this becomes a small inline component — a claim followed by a quiet superscript or a hairline-underlined span that expands to show the receipt (a number, a chart, a command you can run, a permalink). The discipline of *having* to attach a receipt also forces the writing to stay honest, because unbacked superlatives become physically awkward to place. That friction is the point.

### 1.2 Limitations are shown by default, not hidden behind a click

Trait: *flags own limitations before anyone else can.*

Every system/project page has a **"What this does not do"** block that is open by default and sits *above the fold of the case study*, not buried at the bottom. Most portfolios hide weaknesses; surfacing them reads, to a sophisticated reader, as confidence. A project page that opens with "works only for English-language inputs; degrades on documents over ~40 pages; not validated on clinical data" tells a reviewer more about the author's judgment than any list of features.

This is also the single most differentiating thing on the site. Almost nobody does it, and the people you want to impress will notice within five seconds.

### 1.3 Reproducibility is a first-class interface element

Trait: *builds runnable, reproducible systems, not notebook demos; works inside real hardware limits (RTX 4050, 6 GB VRAM).*

Give every system a **reproduce affordance** with a fixed shape:

- the exact command (copyable),
- the environment it assumes,
- the hardware it was actually run on, stated plainly,
- expected runtime, and
- expected output.

And lean *into* the hardware constraint as a credibility signal rather than apologizing for it. A small badge — **"runs on a 6 GB consumer GPU"** — is more persuasive to the right audience than "state of the art," because it proves the work is real, owned, and engineered under constraints rather than rented from a leaderboard. Constraint-honesty is a flex here.

### 1.4 Every system shows its operational profile

Trait: *privacy-by-design, cost tracking, ethics, human-in-the-loop are part of how "finished" is defined.*

This is where the engineer-researcher maturity gets made visible. Each deployable system carries a compact **operational profile** — a small, consistent data panel, the same on every project, showing:

- **Cost**: rough inference cost per query / per run.
- **Privacy posture**: does data leave the device? what's stored? for how long?
- **Human-in-the-loop**: where a human approves, overrides, or is required.
- **Known failure modes**: how it fails, and what it does when it fails.
- **Status**: prototype / deployed / archived — stated, not implied.

Almost no student portfolio has this, and it's the clearest possible signal of someone who defines "done" the way a serious team does. Because it's the *same panel everywhere*, it also doubles as a structural rhythm for the design (more on that in §3).

### 1.5 The two identities get two lenses, not one flat grid

Trait: *thinks like an engineer and a researcher at once.*

Resist the single "Projects" wall. The work genuinely lives along two axes, and the IA should say so:

- **Systems** — things that run. Have an architecture, an operational profile, a deploy target, latency/cost numbers.
- **Inquiry** — questions asked. Have a hypothesis, a method, a result, and an honest "what we still don't know." Conference submissions live here, *including rejected ones with what was learned.*

Some work appears under both lenses, viewed differently — the same project as "a deployed RAG service" and as "an experiment in retrieval-grounded honesty." Letting one artifact wear two hats is itself an argument that the author moves between the two modes, which is exactly the brief.

---

## 2. The centerpiece: one live thing that proves capability instead of claiming it

A portrait and a tagline is the template hero. For this person, **the hero should be the most characteristic thing in their world**, and the most characteristic thing they do is build retrieval/agentic systems that *know when to decline.*

So the signature, load-bearing element of the whole site is **one genuinely working, cost-bounded demo**: a small RAG agent over the author's *own* project writeups and notes. The reason it's perfect:

- It's show-don't-tell — the visitor asks it about the work and watches it answer from the work.
- It can be built to **visibly expose retrieval**: show the chunks it pulled, show the token/cost meter ticking, show latency. That makes cost-tracking and reproducibility *tangible* rather than asserted.
- It can be built to **decline honestly** — when the question isn't answerable from the indexed material, it says so instead of hallucinating. A demo that refuses to bluff is the entire personality of the brief, rendered interactive.

Guardrails that are themselves part of the message: a hard daily spend cap, per-IP rate limiting, a visible "this demo is rate-limited and costs ~$X/query" note, and a graceful degraded state when the cap is hit ("budget for today is spent — here's a recorded transcript instead"). The guardrails aren't damage control; they're a live demonstration of cost-and-ethics-by-design.

This one element is where you "spend your boldness." Everything around it stays quiet so it lands.

---

## 3. Information architecture

A small site, deliberately. Five surfaces:

```
/                  Thesis + the live demo + the 2–3 strongest artifacts
/systems           Things that run (operational profiles, architecture, reproduce blocks)
/systems/<slug>    A single system case study
/inquiry           Research: questions, methods, results, honest status (incl. rejections)
/notes             A running lab log — what I'm learning, stuck on, was wrong about
/colophon          How this site is built — itself an artifact (see §6)
/                  Contact: one real channel, no form theatre
```

Two non-obvious choices worth defending:

**The landing page should not introduce a person; it should make an argument and then immediately hand over proof.** One tight paragraph stating what they do *and the standard they hold the work to*, then the live demo, then the strongest two or three artifacts with their limitations visible. No "Hi, I'm —". The "operates above their year" claim is never written down; it's left for the visitor to conclude from the artifacts. Asserted precocity is cringe; demonstrated precocity is the whole site.

**`/notes` is the warmth.** An austere evidence-machine risks reading as cold or as try-hard-minimal (its own cliché). The antidote isn't decoration — it's *voice*. A running log of "things I changed my mind about," "what I'm currently stuck on (CUDA kernels, RNN intuition, ROS 2)," and "a result I expected that didn't happen" makes the site a living document and shows the self-aware, fast-moving quality directly. A single honest "I was wrong about X, here's what I missed" entry is more disarming and more credible than any amount of polish.

---

## 4. A concrete visual direction (not a mood, a token system)

The brief says *no generic design*, so it's worth being explicit about what "generic" currently means, because AI-assisted and template portfolios in 2025–26 cluster hard around three looks. **Avoid all three as defaults:**

1. Warm cream background (~`#F4F1EA`) + high-contrast serif display + a terracotta accent.
2. Near-black background + one acid-green or vermilion accent.
3. Broadsheet layout — hairline rules, zero border-radius, dense newspaper columns.

Each is fine when the brief *asks* for it; none should be reached for by reflex. The brief here doesn't ask for any of them.

What the brief *does* point at is a different reference class entirely: the **technical-document / lab-notebook / well-typeset-paper** lineage — the visual seriousness of a research artifact, not a "creative developer" site. Think the typographic care of an explorable explanation or a journal article, not a SaaS landing page. That gives a direction that's distinctive precisely because it's borrowed from where this person's credibility actually lives.

A worked starting token system (treat as a first draft to push on, not gospel):

**Palette** — restrained, paper-and-ink with a single instrument-panel accent:
- `--ink` `#1A1A17` (near-black text, slightly warm)
- `--paper` `#FBFAF7` (off-white, *not* the cliché cream — push it lighter/cooler)
- `--rule` `#D8D4CC` (hairlines, table borders, the operational-profile grid)
- `--muted` `#6B6660` (metadata, captions, monospace labels)
- `--signal` `#2F5D50` (one deep instrument green — used *only* for live/interactive state: the demo, the cost meter, "deployed" status). One accent, one job.
- `--flag` `#9A3B3B` (used *only* for the limitations/failure-mode blocks, so honesty has its own consistent color)

The `--flag` choice is a small but real idea: limitations always render in the same restrained red, so across the whole site "here's what's wrong with this" becomes a recognizable visual motif. The site has a *color for honesty.*

**Type** — three roles, deliberately not the families everyone reaches for:
- **Display/body for prose**: a serious text face with real opinion — something like *Source Serif 4*, *Newsreader*, or *Spectral* for reading; it should feel like a paper, not a poster.
- **Utility/data**: a humanist mono — *IBM Plex Mono* or *Commit Mono* — for the operational profiles, reproduce blocks, costs, hardware specs, and metadata. The mono *is* the technical personality; let it carry weight.
- Keep the display face used with restraint and let the type scale (not decoration) create hierarchy.

**Layout** — a reading column for prose with a **persistent margin rail** on wider screens that holds metadata: status, cost, hardware, last-verified date, receipts. This is the signature structural device, and it earns its place because it encodes something true — *the work always travels with its metadata.* It's the lab-notebook margin, not an ornament.

```
┌─────────────────────────────┬───────────────┐
│  System: <name>             │  status: deployed
│                             │  hardware: RTX 4050 / 6GB
│  What it does (1 para)      │  cost: ~$0.0004 / query
│                             │  privacy: on-device, no logs
│  ▸ What it does NOT do      │  HITL: human approves writes
│    (open by default, --flag)│  last verified: 2026-06-11
│                             │  ↳ receipts: bench · repo · demo
│  Architecture diagram       │
│  Reproduce ▸ (copy cmd)     │
└─────────────────────────────┴───────────────┘
```

**Signature, in one line:** the margin rail + the dedicated color-for-honesty. That's the one thing the site is remembered by. Everything else stays quiet so those two read clearly.

**Motion**: almost none, and that's a value statement. Respect `prefers-reduced-motion`. The only animation that earns its keep is *functional* — the cost meter incrementing during a live demo query, a receipt expanding. No scroll-jacking, no parallax, no particle background. Stillness reads as confidence here.

---

## 5. The data model that enforces the honesty

The fastest way to make all of §1 actually happen (instead of decaying into "I'll add limitations later") is to **make the content schema require it.** If a project literally cannot be published without its limitations and operational profile filled in, the discipline is structural rather than aspirational. This is the engineer's move — encode the value as a constraint.

With a content-collection setup (e.g. Astro + Zod), the schema can mandate the honest fields:

```ts
// content/config.ts  — required fields make over-claiming impossible to ship
const systems = defineCollection({
  schema: z.object({
    title: z.string(),
    summary: z.string().max(280),
    status: z.enum(['prototype', 'deployed', 'archived']),
    limitations: z.array(z.string()).min(1),      // cannot be empty
    hardware: z.string(),                          // "RTX 4050 (6GB) / Ryzen 7"
    cost_profile: z.string(),                      // "~$0.0004 / query"
    privacy: z.string(),                           // "on-device; no request logging"
    human_in_the_loop: z.string().optional(),
    failure_modes: z.array(z.string()).min(1),     // cannot be empty
    reproduce: z.object({
      command: z.string(),
      runtime: z.string(),
      expected_output: z.string(),
    }),
    receipts: z.array(z.object({                   // every system links to proof
      label: z.string(),
      url: z.string().url(),
    })).min(1),                                     // cannot be empty
    last_verified: z.date(),                       // honesty has a freshness date
  }),
});
```

`limitations`, `failure_modes`, and `receipts` having `.min(1)` is the whole philosophy in three lines: **you cannot publish a system on this site without admitting at least one weakness and linking at least one proof.** `last_verified` is a quietly powerful field — it tells the reader the author knows that unmaintained claims rot, and is tracking it.

A matching project file is then just honest data:

```yaml
title: "Grounded RAG over clinical guidelines"
status: prototype
summary: "Retrieval-grounded QA that abstains when evidence is thin."
hardware: "RTX 4050 (6GB) — quantized 7B, llama.cpp"
cost_profile: "~$0 (local inference) / ~120ms retrieval"
privacy: "Runs fully local; no documents leave the machine."
human_in_the_loop: "Abstains and routes to a human when top-k similarity < threshold."
limitations:
  - "English-only; not evaluated on non-English guidelines."
  - "Not clinically validated — research artifact, not a medical device."
  - "Degrades on tables and multi-column PDFs."
failure_modes:
  - "On ambiguous queries it abstains rather than guessing (by design)."
last_verified: 2026-06-11
receipts:
  - { label: "eval notebook", url: "https://..." }
  - { label: "repo", url: "https://..." }
```

The "not a medical device" line matters a lot given the medical-AI interest — it's exactly the kind of self-flagged ethical boundary that separates a credible student from a reckless one, and reviewers read for it.

---

## 6. Tech stack, justified by the values (not by what's trendy)

The stack choices should *also* obey the thesis, because a sophisticated visitor will look at the network tab and the repo.

- **Astro, static-first.** Ships zero JS by default, MDX/content-collections for the structured-honesty schema above, and islands so the *one* interactive demo can be a React/Svelte island without dragging a framework runtime onto every page. This directly serves "fast, mostly static, interactivity only where it earns its place." It's the framework that matches the personality.
- **The demo backend in FastAPI** — already in the author's stack, lets the live RAG demo be a *real deployed system* (and therefore its own portfolio entry, with its own operational profile — pleasingly recursive). Hard spend cap + per-IP rate limit enforced server-side.
- **Hosting**: static front end on Cloudflare Pages / Netlify / Vercel (any is fine; pick on free-tier limits). Demo backend on Fly.io / Railway / a small VPS with a billing alert *and a hard cap*, not just an alert.
- **Styling**: hand-tuned CSS with custom properties for the token system, or Tailwind kept on a tight leash with the tokens defined centrally. Either way the design must not look like the framework's defaults — derive every color and size from §4, not from the utility classes that ship in the box.
- **The repo is public, with a real README,** so the site is itself a reproducible artifact. This closes the loop: the colophon page links to the repo, the README shows how to run the site locally, and the whole thing becomes one more example of the standard it preaches.

Verify current framework versions and free-tier limits when you start — those move faster than the design principles do.

## 7. The non-negotiable quality floor

Because the site *is* the argument for someone who values runnable, accessible, honest systems, these aren't nice-to-haves; failing them undermines the message:

- **Core content works with JavaScript disabled.** The demo is the only thing that needs JS; everything else is readable without it.
- **Lighthouse / accessibility**: semantic HTML, real heading order, visible keyboard focus, color contrast that passes AA on that paper-and-ink palette, `prefers-reduced-motion` honored.
- **Fast and light** — a portfolio for a reproducibility person should not ship megabytes. Budget it.
- **Every external claim link actually resolves** (a broken receipt is worse than no receipt). Worth a link-checker in CI — again, the value encoded as a constraint.

## 8. Voice and microcopy

Copy makes a design feel templated as fast as visuals do. Rules tuned to this person:

- **No "passionate," "ninja," "rockstar," "love building cool things."** State what is done, plainly and specifically. Specific beats clever, every time.
- **Own the stage honestly.** Part of intellectual honesty is not pretending to be a staff engineer. "Second-year, and here's what I've nonetheless shipped" is stronger than vague seniority cosplay — it sets the bar low and then clears it spectacularly, which is the most flattering possible frame.
- **Active, exact labels.** A "reproduce" button reproduces; a "limitations" heading says exactly that. No euphemism for weakness.
- **Errors and empty states have a voice and a direction** (the rate-limited demo's "budget spent for today, here's a transcript" is a copy opportunity, not an apology).

## 9. Anti-patterns — the explicit "do not" list

Since the request was *no generic design*, here is what to actively refuse:

- Skills sections with proficiency bars ("Python 90%"). Self-rated competence with no referent is the opposite of claims-with-receipts. Replace with linked artifacts.
- A typewriter/typing animation on the hero. A particle.js or animated-gradient background. Parallax. Scroll-jacking.
- "Hi, I'm —" + portrait + tagline as the hero.
- A contact form that emails into the void. One real link is more honest.
- A dark-mode toggle used as a substitute for having a point of view. (Dark mode is fine; it's not a personality.)
- Screenshots-as-proof with no way to verify. A screenshot is a claim, not a receipt.
- The three AI-default looks in §4.
- Any superlative ("cutting-edge," "state-of-the-art," "revolutionary") that isn't immediately followed by the number that earns it.

## 10. A build sequence that ships something honest early

Match the author's actual disposition — deployable over impressive, iterate in public:

1. **Spine first**: Astro skeleton, the content schema from §5, one real system written up *with its limitations and receipts*, deployed to a URL. Boring on purpose. It's already more honest than most finished portfolios.
2. **The margin rail + color-for-honesty** — implement the one signature so the design has its identity, on that single page, before scaling.
3. **Backfill systems and inquiry** using the schema. The schema does the quality control.
4. **The live demo last**, as its own deployed service with hard cost caps — because it's the riskiest piece and the spine shouldn't depend on it.
5. **`/notes` and `/colophon`** — turn the lab log on and let the site start accumulating voice and a public build trail.

Ship after step 1. A live, honest, reproducible single-project site beats a perfect unshipped one — which is, conveniently, the entire thesis of the person it's for.

---

### The test for every future decision

When unsure about any later choice, run it through one question: *does this make the site more honest, more reproducible, more precise — or only more impressive?* Keep choosing the former and the site will end up being the most persuasive thing in the portfolio, because it will be the first artifact the visitor meets that already lives by the standard everything else claims.
