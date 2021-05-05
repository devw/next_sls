import { Toast } from '@shopify/app-bridge/actions';

class Notifier {
  constructor(app, duration) {
    this.app = app;
    this.duration = duration || 3000;
  }

  info(message) {
    const toastNotice = Toast.create(this.app, {
      message,
      isError: false,
      duration: this.duration
    });
    
    toastNotice.dispatch(Toast.Action.SHOW);
  }

  error(message) {
    const toastNotice = Toast.create(this.app, {
      message,
      isError: true,
      duration: this.duration
    });

    toastNotice.dispatch(Toast.Action.SHOW);
  }
}

export default Notifier;