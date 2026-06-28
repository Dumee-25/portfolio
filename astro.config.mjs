// @ts-check
import { defineConfig } from 'astro/config';

// Static-first. Zero JS shipped by default — the thesis, encoded in the config.
// See /colophon for why. https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Deployed URL (used for canonical links + Open Graph tags).
  site: 'https://portfolio.kadpkumarapeli.workers.dev',
  output: 'static',
  prefetch: false,
  build: {
    inlineStylesheets: 'auto',
  },
});
