import Push from 'appcenter-push';
import { AppState, Alert } from 'react-native';

export default class BlueNotifications {
  static async setEnabled(value) {
    let setListener = !(await Push.isEnabled());
    await Push.setEnabled(value);
    if (setListener) {
      await BlueNotifications.setListener();
    }
  }

  static async isEnabled() {
    return Push.isEnabled();
  }

  static async setListener() {
    if (await Push.isEnabled()) {
      Push.setListener({
        onPushNotificationReceived: function(pushNotification) {
          let message = pushNotification.message;
          let title = pushNotification.title;

          if (message === null) {
            // Android messages received in the background don't include a message. On Android, that fact can be used to
            // check if the message was received in the background or foreground. For iOS the message is always present.
            title = 'Android background';
            message = '<empty>';
          }

          // Custom name/value pairs set in the App Center web portal are in customProperties
          if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
            message += '\nCustom properties:\n' + JSON.stringify(pushNotification.customProperties);
          }

          if (AppState.currentState === 'active') {
            Alert.alert(title, message);
          } else {
            // Sometimes the push callback is received shortly before the app is fully active in the foreground.
            // In this case you'll want to save off the notification info and wait until the app is fully shown
            // in the foreground before displaying any UI. You could use AppState.addEventListener to be notified
            // when the app is fully in the foreground.
          }
        },
      });
    }
  }
}

BlueNotifications.setListener();
