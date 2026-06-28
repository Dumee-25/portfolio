// @ts-check
import { defineConfig } from 'astro/config';

// Static-first. Zero JS shipped by default — the thesis, encoded in the config.
// See /colophon for why. https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Set this to your real deployed URL before going live (used for canonical + sitemap).
  site: 'https://dumindu.dev',
  output: 'static',
  prefetch: false,
  build: {
    inlineStylesheets: 'auto',
  },
});
