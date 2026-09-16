/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Relative asset paths, so the built app works whether it is served from the
  // root of a domain or from a subfolder (GitHub Pages project sites).
  base: './',
  plugins: [
    react(),
    /**
     * Offline play. Once the hosted site has been opened once, every asset —
     * including the lazily-loaded editor and the sandbox worker — is cached, so
     * the game keeps working on a train, a plane, or with no signal at all.
     *
     * Note this only activates over HTTPS (or localhost): browsers refuse to
     * register a service worker on a plain-HTTP LAN address, so the home Wi-Fi
     * URL will never cache. That is a browser rule, not a setting.
     */
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      // We ship our own manifest in public/ rather than generating one.
      manifest: false,
      workbox: {
        // Already covers the icon and the manifest, so there is no
        // `includeAssets` here — listing them again just precaches them twice.
        globPatterns: ['**/*.{js,css,html,svg,webmanifest}'],
        // Any in-app URL falls back to the shell, which is all this app needs.
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
