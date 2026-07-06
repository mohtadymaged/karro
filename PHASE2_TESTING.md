# Phase 2 Testing Guide

## Pre-test Setup

1. **Build and open Xcode**:
   ```bash
   npm run ios:open
   ```

2. **In Xcode**:
   - Select **iPhone 15** from top menu
   - Press **Cmd+B** to build
   - Press **Cmd+R** to run in simulator

3. **Backend running** (in another terminal):
   ```bash
   npm run dev:api
   # Starts on http://localhost:4000
   ```

---

## Test 1: Camera Integration

### Scenario: User uploads a photo for a listing

**Steps**:
1. Tap home icon → bottom nav
2. Tap the **Sell button** (bottom center) — opens sell sheet
3. Tap **"📷 Take a picture"** button
4. On iOS simulator: Should request camera permission
   - **Expected**: Permission dialog appears
   - **Action**: Tap "Allow" (or "Don't Allow" to test fallback)
5. After allowing: Camera interface appears (or falls back to file picker on web)
6. Select or take a photo
7. Photo should appear in the photo grid (up to 4 allowed)
8. Verify photo can be removed by tapping X

**Expected result**:
- ✓ Camera dialog or file picker appears
- ✓ Photo is added to listing form
- ✓ Photo is displayed in grid

**Edge cases**:
- Deny permission → falls back to file input
- On web (no native camera) → file input
- Multi-photo upload → up to 4 photos

---

## Test 2: Native Share

### Scenario: User shares a listing with a friend

**Steps**:
1. Browse marketplace → tap any listing
2. In listing detail, look for **↗️ share button** (top right, next to ❤️)
3. Tap the share button
4. On iOS: Native share sheet should appear
   - Options: Messages, Mail, AirDrop, Copy, More...
5. Tap **"Messages"** to test
6. Select a contact and send
7. Verify listing info is shared

**Expected result**:
- ✓ Share sheet appears on iOS
- ✓ Can share to Messages/Mail/AirDrop
- ✓ Listing title and URL are shared

**Edge cases**:
- On web without native Share API → clipboard copy
- Cancel share → no error
- Try multiple shares

---

## Test 3: Push Notifications (Infrastructure)

### Scenario: App requests push permission on startup

**Steps**:
1. Sign in to the app (create account if needed)
2. App should automatically request push notification permission
   - **Expected**: Permission dialog appears
   - **Action**: Tap "Allow" (or "Don't Allow")
3. If allowed, check Xcode debugger output:
   - Look for: `Push registered with token: ...`
4. Backend should receive device token registration
   - **Check**: `curl http://localhost:4000/api/health` returns `{"ok":true}`

**Expected result**:
- ✓ Permission dialog appears on first app launch
- ✓ If allowed, token is registered with backend
- ✓ No console errors

**To verify backend received token**:
```bash
# In another terminal, check backend logs
npm run dev:api
# Should show registration logs if push initialized
```

**Note**: Full push notification testing requires:
- Apple Developer account
- APNs certificate
- Production backend (Render, not localhost)
- Actual APNs library integration (Phase 4)

---

## Test 4: Account Deletion (API)

### Scenario: API endpoint works for deleting account

**Steps**:
1. With app signed in, open Xcode Console
2. In browser DevTools or via curl:
   ```bash
   curl -X DELETE http://localhost:4000/api/me \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```
3. Should return: `{"ok":true,"message":"Your account has been permanently deleted."}`
4. User's account and all data should be deleted from `server/data/db.json`

**Expected result**:
- ✓ DELETE request succeeds
- ✓ User removed from database
- ✓ All user's listings removed

**Note**: Frontend UI for account deletion comes in Phase 3

---

## Test 5: Report & Block APIs

### Scenario: Reporting a listing works

**Steps**:
1. Via curl or Postman:
   ```bash
   curl -X POST http://localhost:4000/api/listings/L1/report \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"reason":"Inappropriate content"}'
   ```
2. Should return: `{"ok":true,"message":"Listing reported..."}`
3. Check `server/data/db.json` → `reports` array should contain the report

**Expected result**:
- ✓ Report endpoint works
- ✓ Report stored in database

**Note**: Frontend UI for reporting comes in Phase 3

---

## Troubleshooting

### Camera doesn't appear
- **Simulator limitation**: Simulator has limited camera support
- **Fix**: Use iPhone 15 Pro simulator or test on physical device
- **Fallback**: File input still works on all platforms

### Permission dialog doesn't appear
- **Cause**: Already granted/denied permission in previous test
- **Fix**: Reset simulator (`Device → Erase All Content and Settings`)
- **Or**: Run on fresh simulator instance

### Push permission dialog doesn't appear
- **Cause**: Not yet in authenticated state
- **Check**: User must be signed in to app before permission appears
- **Fix**: Complete sign-up/sign-in flow first

### Backend token registration fails
- **Check**: Backend running on `http://localhost:4000`
- **Check**: User is authenticated (has valid JWT token)
- **Check**: Xcode console logs for errors

### Share button doesn't appear
- **Check**: Item detail page loaded correctly
- **Check**: Not in web version (native only)
- **Fix**: Reload simulator app (Cmd+R)

---

## Success Checklist

- [ ] Camera permission requested on first use
- [ ] Camera button opens camera (or file picker as fallback)
- [ ] Photos upload and display in listing form
- [ ] Share button opens native sheet (iOS) or copies to clipboard (web)
- [ ] Share works with Messages/Mail
- [ ] Push permission dialog appears after sign-in
- [ ] Device token registered with backend (check logs)
- [ ] No console errors in Xcode debugger
- [ ] Account deletion API responds correctly
- [ ] Report/block APIs respond correctly

---

## Next Phase (Phase 3)

After verifying these tests pass:
1. Add frontend UI for account deletion
2. Add UI for report/block functionality
3. Write and integrate Terms of Use & Privacy Policy
4. Set up moderation system
5. Prepare for TestFlight submission
