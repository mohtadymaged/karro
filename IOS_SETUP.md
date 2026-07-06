# Karro iOS Setup Guide

## Prerequisites

- **macOS** (required for iOS development)
- **Xcode 14+** (from App Store)
- **Node.js 20+**
- **Capacitor CLI** (`npm install -g @capacitor/cli` or use `npx cap`)

## Phase 1: Initial Setup (Complete ✓)

The following have been configured:
- ✓ Capacitor initialized with iOS platform
- ✓ `capacitor.config.json` created
- ✓ iOS Xcode project generated (`ios/App/`)
- ✓ React build pipeline ready
- ✓ Platform detection bridge (`app/src/native.js`)

## Development Workflow

### 1. Start the backend API
```bash
npm run dev:api
# Starts on http://localhost:4000
```

### 2. Build and sync iOS
```bash
npm run build:ios
# Builds React app and syncs with iOS
```

### 3. Open in Xcode
```bash
npm run ios:open
# Or: npx cap open ios
```

### 4. Build & Run in Simulator

In Xcode:
1. Select **Product → Destination → iPhone 15** (or your preferred device)
2. Click **Product → Build** (Cmd+B) to verify compilation
3. Click **Product → Run** (Cmd+R) to launch in simulator

### 5. Point to Backend

**For local development:**
- Backend runs on `http://localhost:4000`
- App should connect automatically (see `api.js`)
- Simulator has access to host network via `10.0.2.2` (Android) or `localhost` (iOS simulator)

**For staging/TestFlight:**
- Update `capacitor.config.json` `server.url` to point to Render backend
- Or set `VITE_API_URL` environment variable:
  ```bash
  VITE_API_URL=https://karro-j955.onrender.com/api npm run build:ios
  ```

## Common Commands

| Command | What it does |
|---------|-------------|
| `npm run build:ios` | Build React + sync iOS |
| `npm run ios:open` | Open iOS project in Xcode |
| `npm run ios:sync` | Just sync without rebuilding |
| `npm run dev:api` | Start backend API server |
| `npm run dev:web` | Start dev server for web (http://localhost:5173) |

## Troubleshooting

### "Cannot connect to backend"
- Check backend is running: `curl http://localhost:4000/health` (if endpoint exists)
- For simulator: Use `localhost:4000` (iOS simulator can reach host)
- For device: Use your Mac's IP (find with `ifconfig` → `inet` address)
- Update `api.js` or environment variable if needed

### "Xcode build fails"
- Clean build: `Cmd+Shift+K` in Xcode
- Delete derived data: `rm -rf ~/Library/Developer/Xcode/DerivedData/*`
- Sync again: `npm run ios:sync`

### "Assets not loading"
- Ensure React build succeeded: Check `app/dist/` exists
- Re-sync: `npm run ios:sync`
- Clear Xcode cache: **Product → Clean Build Folder**

### "Token/auth issues"
- Clear app data in simulator: **Device → Erase All Content and Settings**
- Check localStorage is working: Open Safari DevTools (Xcode → Debug Navigator)

## Next Steps (Phase 2)

Once you can build and run in the simulator:
1. Test auth flow (sign up, sign in)
2. Browse listings and items
3. Add Camera plugin for photo uploads
4. Add Push Notifications
5. Add native Share

See the main audit plan for Phase 2–4 details.

## Resources

- [Capacitor iOS Docs](https://capacitorjs.com/docs/ios)
- [Capacitor Plugins](https://capacitorjs.com/plugins)
- [Apple Developer](https://developer.apple.com)
