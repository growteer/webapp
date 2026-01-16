# ADR-009: Progressive Web App Support

## Status
Accepted

## Context

The application targets mobile-first PWA experience:
- Must work well on mobile devices (primary platform)
- Should also perform well on desktop
- Needs offline capabilities for basic functionality
- Should be installable on mobile devices
- Avoid native mobile apps in short/mid-term

We need:
- PWA manifest for installability
- Service Worker for offline support and caching
- Proper icons and metadata
- Install prompt functionality

## Decision

We will implement **Progressive Web App (PWA)** support:

1. **Manifest**: `public/manifest.json`
   - App name, icons, theme colors
   - Display mode: `standalone`
   - Linked in root layout

2. **Service Worker**: `public/sw.js`
   - Basic caching strategy for static assets
   - Can be enhanced with Workbox for production
   - Registered via `registerServiceWorker()` from `lib/pwa/service-worker.ts`

3. **Icons**: Required at `public/icon-192.png` and `public/icon-512.png`

4. **Install Prompt**: `usePWAInstallPrompt()` hook in `lib/pwa/install-prompt.ts`
   - Detects when app is installable
   - Provides install prompt functionality

5. **Metadata**: Root layout includes PWA metadata
   - Theme color, viewport settings
   - Apple-specific meta tags for iOS

## Consequences

### Positive

- **Mobile-first**: Excellent experience on mobile devices
- **Installable**: Users can install app like a native app
- **Offline support**: Basic functionality works offline
- **Performance**: Service Worker caching improves load times
- **No app stores**: Avoids app store approval process
- **Single codebase**: No need for separate native apps

### Negative

- **Limited offline features**: Basic service worker only caches static assets
- **iOS limitations**: iOS has some limitations for PWAs (less than Android)
- **Icon generation**: Need to create multiple icon sizes

### Risks

- **Service Worker complexity**: Advanced caching strategies can be complex. Start simple, enhance later.
- **Cache invalidation**: Risk of serving stale content. Service Worker handles cache versioning.
- **Offline experience**: Current implementation is basic. Enhance with Workbox and IndexedDB for advanced offline features.

## Implementation Notes

- Manifest is automatically linked in root layout
- Basic service worker caches static assets
- For production, consider Workbox for advanced caching strategies
- Install prompt hook available for "Add to Home Screen" functionality
- Icons must be added before deploying (192x192 and 512x512)
- See `.cursor/rules/pwa.mdc` for detailed implementation patterns
