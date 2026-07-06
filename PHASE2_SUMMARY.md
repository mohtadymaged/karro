# Phase 2: Native Plugins Integration — Complete ✓

## Plugins Installed & Synced

### 1. **Camera Plugin** (@capacitor/camera)
**Status**: ✓ Integrated and ready

**What it does**:
- Take photos directly from camera
- Pick photos from photo library
- Convert to base64 for upload

**Files created**:
- `app/src/camera-util.js` — Camera wrapper with error handling
- Updated `app/src/page-sell.jsx` — Native camera buttons in listing form

**How it works**:
1. User opens "Sell an Item" sheet
2. On iOS: Camera button → native camera UI (device has permission)
3. On web: Falls back to file input
4. Photo converts to base64 → sent to backend as before

**Permissions added** (Info.plist):
- `NSCameraUsageDescription` — camera access
- `NSPhotoLibraryUsageDescription` — photo library access
- `NSPhotoLibraryAddOnlyUsageDescription` — save photos

---

### 2. **Push Notifications Plugin** (@capacitor/push-notifications)
**Status**: ✓ Backend & frontend integrated

**What it does**:
- Request user permission for push notifications
- Register device with APNs (Apple Push Notification service)
- Receive and handle push notifications
- Store device tokens for targeting

**Files created**:
- `app/src/push-util.js` — Push initialization and listeners
- Updated `app/src/main.jsx` — Init push on app launch

**Server changes** (`server/index.js`):
- `POST /api/me/device-token` — Register device token
- Push permission handled by Capacitor plugin

**Backend ready for**:
- Storing device tokens in `db.deviceTokens`
- Later: APNs integration (Apple Developer account required)

**How it works**:
1. User signs in → app requests push permission
2. If granted: Device token sent to backend
3. Backend stores token per user
4. When message/offer/bid arrives → backend sends push via APNs
5. Notification appears on device

**Note**: Full APNs integration requires:
- Apple Developer account ($99/year)
- APNs certificate from Apple
- Backend APNs library (e.g., `apn` npm package)
- Will be completed before TestFlight submission

---

### 3. **Share Plugin** (@capacitor/share)
**Status**: ✓ Integrated and ready

**What it does**:
- Open native share sheet
- Share listing to Messages, Mail, AirDrop, etc.

**Files created**:
- `app/src/share-util.js` — Share wrapper with fallbacks

**Updated**:
- `app/src/page-item.jsx` — Share button (↗️) added to item header

**How it works**:
1. User views listing details
2. Clicks share button (↗️)
3. On iOS: Native share sheet appears
4. Select Messages, Mail, AirDrop, Copy, etc.
5. Listing title + URL shared

**Fallbacks**:
- Web: Uses native Share API if available
- If not available: Copies to clipboard

---

## App Store Compliance Features Added

### Account Deletion
- **Endpoint**: `DELETE /api/me`
- **What it does**: Wipes all user data (account, listings, messages, offers, bids)
- **Status**: Backend ready; Frontend UI needed in Phase 3

### Report Listing
- **Endpoint**: `POST /api/listings/:id/report`
- **What it does**: Report a listing for rule violations
- **Status**: Backend ready; Frontend UI needed in Phase 3

### Block User
- **Endpoint**: `POST /api/users/:id/block`
- **What it does**: Block a user from contacting you
- **Status**: Backend ready; Frontend UI needed in Phase 3

---

## Build Status

```
React bundle: ✓ 365 KB (gzipped 98.9 KB)
iOS sync: ✓ All assets and plugins synced
Plugins found: ✓ Camera, Push Notifications, Share
```

---

## Next Steps (Phase 3)

### 3a. Account Deletion UI
- Add button in Settings page → Delete Account
- Confirmation modal with warnings
- Call `api.deleteAccount()` on confirm
- Sign out and return to landing

### 3b. Report & Block UI
- Long-press item → Report this listing
- Seller profile → Block this user
- Simple form with reason dropdown
- Success toast with guidance

### 3c. Terms of Use & Privacy
- Write ToS + Privacy Policy (legal review needed)
- Serve at `/terms` and `/privacy`
- Modal on first launch → must accept
- Store acceptance in localStorage

### 3d. Content Moderation
- Flag listings after N reports
- Admin view to review and delete
- Hide flagged listings from marketplace

---

## Testing Checklist Before Submission

- [ ] Camera button works in Sell form
- [ ] Photos upload and display correctly
- [ ] Share button opens native sheet
- [ ] Share works with Messages/Mail/AirDrop
- [ ] App asks for push permission on launch
- [ ] Device token sent to backend
- [ ] Account deletion flow works end-to-end
- [ ] Report/block endpoints respond correctly
- [ ] No console errors in Xcode debugger

---

## Files Changed This Phase

```
✓ app/src/camera-util.js            (new: camera wrapper)
✓ app/src/push-util.js              (new: push initialization)
✓ app/src/share-util.js             (new: share wrapper)
✓ app/src/page-sell.jsx             (updated: camera integration)
✓ app/src/page-item.jsx             (updated: share button + import)
✓ app/src/main.jsx                  (updated: push init on app enter)
✓ app/src/api.js                    (updated: new endpoints)
✓ ios/App/App/Info.plist            (updated: permissions)
✓ server/index.js                   (updated: new endpoints)
✓ package.json                      (updated: plugin versions)
✓ capacitor.config.json             (updated: plugin config)
```

---

## Summary

**What works now**:
- ✓ Camera integration (photos for listings)
- ✓ Native share (share listings to apps)
- ✓ Push notification infrastructure (device tokens stored)
- ✓ Account deletion API
- ✓ Report/block APIs

**What's pending**:
- ⏳ APNs certificate & backend APNs library (Phase 3/4)
- ⏳ Frontend UI for compliance features (Phase 3)
- ⏳ Legal review for ToS/Privacy (Phase 3)
- ⏳ Moderation dashboard (Phase 4)

**Ready for**:
- iOS simulator testing (camera, share, push registration)
- TestFlight beta (without full APNs yet, but structure in place)
