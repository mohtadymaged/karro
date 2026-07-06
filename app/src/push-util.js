// Push Notifications utility
import { PushNotifications } from '@capacitor/push-notifications';
import { isNative } from './native.js';
import { api } from './api.js';

let initialized = false;

export async function initPushNotifications() {
  if (initialized || !isNative) return;
  initialized = true;

  try {
    // Request permission
    const result = await PushNotifications.requestPermissions();
    if (result.receive !== 'granted') {
      console.log('Push permission denied');
      return false;
    }

    // Register for push notifications
    await PushNotifications.register();

    // Listen for registration token
    PushNotifications.addListener('registration', (token) => {
      console.log('Push registered with token:', token.value);
      // Send token to backend
      registerDeviceToken(token.value);
    });

    // Listen for push notifications
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification) => {
        console.log('Push notification received:', notification);
        // Handle notification (show alert, update UI, etc.)
        const { title, body } = notification;
        if (title || body) {
          // In a real app, you'd update UI, play sound, etc.
          console.log(`Notification: ${title} — ${body}`);
        }
      }
    );

    // Listen for notification actions
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (action) => {
        console.log('Push notification action:', action);
        // Handle action (navigate to chat, etc.)
      }
    );

    return true;
  } catch (err) {
    console.error('Push notifications init failed:', err);
    return false;
  }
}

async function registerDeviceToken(token) {
  try {
    await api.registerDeviceToken(token);
    console.log('Device token registered');
  } catch (err) {
    console.error('Failed to register device token:', err);
  }
}

export async function requestPushPermission() {
  if (!isNative) return false;
  try {
    const result = await PushNotifications.requestPermissions();
    return result.receive === 'granted';
  } catch (err) {
    console.error('Push permission request failed:', err);
    return false;
  }
}
