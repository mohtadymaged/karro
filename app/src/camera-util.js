// Camera utility — wraps Capacitor Camera plugin
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { isNative } from './native.js';

export async function takePhoto() {
  if (!isNative) {
    throw new Error('Camera only available on native platforms');
  }

  try {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      promptLabelPhoto: 'Select a photo',
      promptLabelPicture: 'Take a picture',
      promptLabelCancel: 'Cancel',
    });

    return {
      base64: photo.base64String,
      format: photo.format, // 'jpeg' or 'png'
      webPath: photo.webPath, // for preview
    };
  } catch (error) {
    if (error.message === 'User cancelled photos app') {
      return null; // User cancelled, not an error
    }
    throw new Error(`Camera failed: ${error.message}`);
  }
}

export async function pickPhoto() {
  if (!isNative) {
    throw new Error('Photo picker only available on native platforms');
  }

  try {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      promptLabelPhoto: 'Select a photo',
      promptLabelPicture: 'Take a picture',
      promptLabelCancel: 'Cancel',
    });

    return {
      base64: photo.base64String,
      format: photo.format,
      webPath: photo.webPath,
    };
  } catch (error) {
    if (error.message === 'User cancelled photos app') {
      return null;
    }
    throw new Error(`Photo picker failed: ${error.message}`);
  }
}

// Request camera permissions explicitly
export async function requestCameraPermission() {
  if (!isNative) return true;

  try {
    const result = await Camera.requestPermissions();
    return result.camera === 'granted' || result.camera === 'prompt';
  } catch (error) {
    console.error('Camera permission error:', error);
    return false;
  }
}
