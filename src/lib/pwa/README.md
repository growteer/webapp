# PWA Configuration

This directory contains utilities and configuration for Progressive Web App (PWA) support.

## Files

- `service-worker.ts` - Service Worker registration utilities
- `install-prompt.ts` - PWA install prompt hook

## Setup

1. **Manifest**: The `manifest.json` is in `/public/manifest.json` and is automatically linked in the root layout.

2. **Service Worker**: A basic service worker is provided at `/public/sw.js`. For production, consider using Workbox for advanced caching strategies.

3. **Icons**: You'll need to add PWA icons:
   - `/public/icon-192.png` (192x192)
   - `/public/icon-512.png` (512x512)

## Usage

### Service Worker Registration

```tsx
import { registerServiceWorker } from "@/lib/pwa/service-worker";

// In a client component
useEffect(() => {
  registerServiceWorker();
}, []);
```

### Install Prompt

```tsx
import { usePWAInstallPrompt } from "@/lib/pwa/install-prompt";

function InstallButton() {
  const { isInstallable, promptInstall } = usePWAInstallPrompt();

  if (!isInstallable) return null;

  return (
    <button onClick={promptInstall}>
      Install App
    </button>
  );
}
```

## Offline Strategy

The basic service worker caches static assets. For more advanced offline support:
- Use Workbox for runtime caching strategies
- Implement IndexedDB for data storage
- Add offline fallback pages
- Implement background sync for API requests
