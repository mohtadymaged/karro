// Platform detection and native bridge
import { Capacitor } from '@capacitor/core';

export const isNative = Capacitor.isNativePlatform();
export const platform = Capacitor.getPlatform(); // 'ios', 'android', 'web'

// Check if running on iOS
export const isIOS = platform === 'ios';
export const isAndroid = platform === 'android';
export const isWeb = platform === 'web';

// Safe native plugin access
export function usePlugin(PluginClass) {
  if (!isNative) return null;
  return PluginClass;
}
