// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

// Static-first. Zero JS shipped by default — the thesis, encoded in the config.
// See /colophon for why. https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Deployed URL (used for canonical links + Open Graph tags).
  site: 'https://portfolio.kadpkumarapeli.workers.dev',
  output: 'static',
  prefetch: false,
  // Reference images as plain static files instead of the runtime /_image
  // endpoint, so they work on any host (incl. Cloudflare Workers). The portrait
  // is already cropped small, so we don't need on-the-fly optimization.
  image: { service: passthroughImageService() },
  build: {
    inlineStylesheets: 'auto',
  },
});
