---
title: 'Fulyn: A Private Agent That Remembers Your Life'
order: 4
status: prototype
summary: 'Type about your day in plain words. Fulyn turns it into expenses, sleep, mood, people and journal records you can ask about later. The model can only do what the code allows.'
stack: ['FastAPI', 'PostgreSQL', 'pgvector', 'SQLAlchemy', 'Ollama', 'nomic-embed-text', 'Next.js 16', 'Docker Compose']
hardware: 'Runs on my own laptop (RTX 4050 6GB / Ryzen 7) in Docker; the model runs in Ollama, either locally or as an Ollama cloud model.'
cost_profile: 'About $0 with a local model. I have also run it on Nemotron cloud models through Ollama, which are billed on their terms.'
privacy: 'Data lives only in a local Postgres volume and every service binds to 127.0.0.1. With a local model nothing leaves the machine. With a cloud model, chat messages go to Ollama''s hosted service; embeddings stay local.'
human_in_the_loop: 'I read what each message logged and fix it in the same chat ("actually the bill was 1550", /undo, /date yesterday).'
limitations:
  - 'Single user with no login. It is only safe on your own machine, never on a network or public server.'
  - 'Small local models cannot drive this many tools reliably. In the opt-in tests, llama3.2 failed most cases by calling the wrong tool or inventing arguments.'
  - 'Built for one person: the timezone, currency and expense categories are set in config, not per user.'
failure_modes:
  - 'If the model sends bad tool arguments, the backend rejects them and returns the error so the model can retry, up to 8 rounds per message.'
  - 'If the embedding model is down, entries still save and search falls back to full text only. Missing embeddings are filled in later.'
  - 'If Ollama is down, chat is unavailable, but slash commands like /spent, /undo and /today still run because they never touch the model.'
reproduce:
  command: 'git clone https://github.com/Dumee-25/Fulyn && cd Fulyn && cp .env.example .env && docker compose up -d --build'
  environment: 'Docker (PostgreSQL 17 with pgvector), Ollama on the host with OLLAMA_MODEL and OLLAMA_EMBED_MODEL set. See repo README.'
  runtime: 'About 20 seconds from stopped with the Windows launcher; the first build takes longer.'
  expected_output: 'The app at localhost:3000. A chat message like "slept at 2, iced latte at 10, spent 1450 with Maya" becomes linked sleep, caffeine, expense, mood and journal records.'
receipts:
  - { label: 'repository', url: 'https://github.com/Dumee-25/Fulyn' }
last_verified: 2026-09-27
---

I use Fulyn every day. I tell it about my day the way I would text a friend, and
it keeps the record for me: what I spent, how I slept, how I felt, who I saw. Later
I can ask it things like how much I spent on coffee this month or when I last met
someone.

## How it works

A message goes to the model with a set of tools. Each tool call is checked against
a schema and run by a normal backend service, so the model never writes SQL. The
loop repeats until the model answers without calling a tool.

Some rules are enforced in code instead of trusted to the prompt:

- **Your words stay yours.** The journal tool takes no text argument. It always
  saves the message exactly as typed, so the model cannot rewrite it.
- **Everything is linked.** Each record a message creates points back to that
  journal entry. If the model forgets to save the entry, the backend saves it.
- **The vault is sealed.** Private entries live behind their own code path, and
  the journal search tools never return them.

## Why search is hybrid

I started with vector search alone and it did not hold up. A question about a
person who never appears in my journal still scored 0.62 against unrelated
entries, higher than some real matches. So search now runs vector and full text
side by side, merges the two rankings, and marks which results actually share a
word with the question. The agent is told that a result with no keyword match is
not evidence.

## Everyday use

A small Windows launcher starts Docker, Ollama and the app, then opens Fulyn in
its own window. Slash commands handle the quick things without the model, and the
Settings page exports everything to ZIP, JSON, CSV or Markdown.
