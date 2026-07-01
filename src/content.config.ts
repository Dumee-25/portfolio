import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The schema IS the honesty policy. Required fields make over-claiming
// impossible to ship: you cannot publish a system on this site without
// admitting at least one weakness and linking at least one proof.
// (design report §5)

const receipt = z.object({
  label: z.string(),
  url: z.string().url(),
});

const systems = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/systems' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(99),
    summary: z.string().max(280),
    status: z.enum(['prototype', 'deployed', 'archived']),
    stack: z.array(z.string()).default([]),
    hardware: z.string(), // "RTX 4050 (6GB) / Ryzen 7"
    cost_profile: z.string(), // "~$0.0004 / query"
    privacy: z.string(), // "on-device; no request logging"
    human_in_the_loop: z.string().optional(),
    limitations: z.array(z.string()).min(1), // cannot be empty
    failure_modes: z.array(z.string()).min(1), // cannot be empty
    reproduce: z
      .object({
        command: z.string(),
        environment: z.string().optional(),
        runtime: z.string(),
        expected_output: z.string(),
      })
      .optional(),
    receipts: z.array(receipt).min(1), // every system links to proof
    last_verified: z.coerce.date(), // honesty has a freshness date
  }),
});

// Inquiry — questions asked. Hypothesis, method, result, honest "what we
// still don't know". Status is first-class, including rejections. (§1.5)
const inquiry = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/inquiry' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(99),
    summary: z.string().max(320),
    status: z.enum(['ongoing', 'under-review', 'accepted', 'rejected', 'published']),
    venue: z.string().optional(),
    method: z.string().optional(),
    open_questions: z.array(z.string()).min(1), // the honest "what we don't know yet"
    receipts: z.array(receipt).default([]),
    last_verified: z.coerce.date(),
  }),
});

// Notes — the warmth. A running lab log: what I changed my mind about,
// what I'm stuck on, a result I expected that didn't happen. (§3)
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['changed-my-mind', 'stuck-on', 'surprised-me', 'log']).default('log'),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { systems, inquiry, notes };
