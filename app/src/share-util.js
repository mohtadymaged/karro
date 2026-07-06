// Native share utility — wraps Capacitor Share plugin
import { Share } from '@capacitor/share';
import { isNative } from './native.js';

export async function shareItem(item) {
  const title = item.name;
  const text = `Check out "${item.name}" on Karro — El Gouna's community marketplace!`;
  const url = `https://karro.app/items/${item.id}`; // deep link (can update later)

  if (!isNative) {
    // Fallback for web: use native Share API if available
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    }
    // Fallback: copy to clipboard
    const shareText = `${title}\n${text}\n${url}`;
    try {
      await navigator.clipboard.writeText(shareText);
      return { copied: true };
    } catch (err) {
      console.error('Copy to clipboard failed:', err);
    }
    return null;
  }

  // Native share for iOS/Android
  try {
    await Share.share({
      title,
      text,
      url,
      dialogTitle: 'Share listing',
    });
  } catch (err) {
    console.error('Native share failed:', err);
    throw new Error('Could not share: ' + err.message);
  }
}
