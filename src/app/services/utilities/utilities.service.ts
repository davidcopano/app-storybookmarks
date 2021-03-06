import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { Capacitor, Plugins } from '@capacitor/core';
import { HttpErrorResponse } from '@angular/common/http';
import { LangService } from '../lang/lang.service';
import { TranslateService } from '@ngx-translate/core';

const { Clipboard, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  public loading: HTMLIonLoadingElement;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public platform: Platform,
    public toast: ToastController,
    public langService: LangService,
    public translateService: TranslateService,
  ) { }

  /**
   * Close the current sessión in the application.
   * @returns An resolved promise if the session is successfully closed. An rejected promise when it fails
   */
  public closeSession(): Promise<any> {
    return new Promise((resolve, reject) => {
      Storage.remove({
        key: 'userData'
      }).then(() => {
        resolve(null);
      }).catch(error => {
        reject('Error al borrar datos de sesión');
      });

      // this.storage.ready().then(() => {
      //   this.storage.remove('userData').then(() => {
      //     resolve(null);
      //   }).catch(error => {
      //     reject('Error al borrar datos de sesión');
      //   });
      // }).catch(error => {
      //   reject('Error al obtener tus datos');
      // });
    });
  }

  /**
   * Shows a loading spinner.
   * @param [message] Loading message.
   * @param [duration] Duration of the spinner about to show.
   */
  async showLoading(message?: string, duration?: number) {
    this.loading = await this.loadingCtrl.create({
      message: message ? message : null,
      duration: duration ? duration : null
    });
    return this.loading.present();
  }

  /**
   * Dismiss the current loading spinner.
   */
  public dismissLoading() {
    if (this.loading) {
      return this.loading.dismiss();
    }
    return Promise.resolve(true);
  }

  /**
   * Copies the text passed to the device's clipboard.
   * Internally detects when the application is running as a mobile app or in a browser, and properly copies the text.
   * @param text Text to be copied to the clipboard
   */
  public copyToClipboard(text: string) {
    if (this.isInMobileDevice()) {
      Clipboard.write({
        string: text
      });
    }
    else {
      const aux = document.createElement('input');
      aux.setAttribute('value', text);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand('copy');
      document.body.removeChild(aux);
    }
  }

  /**
   * Returns if the application is running on a mobile device.
   * @returns If the application is running on a mobile device.
   */
  isInMobileDevice() {
    return this.platform.is('mobile') ? true : false;
  }

  /**
   * Returns the operating system of the device.
   * @returns The operating system of the device.
   */
  public getPlatform() {
    return Capacitor.getPlatform();
  }

  /**
   * Returns the name of the passed file (including the extension).
   * @param path File path
   */
  public getFileName(path: string) {
    return path.split('/').pop();
  }

  /**
   * Returns the extension of the passed file
   * @param path File path
   */
  public getFileExtension(path: string) {
    return path.split('.').pop().toLowerCase();
  }

  /**
   * Returns whether a URL is an image or not
   * @param url URL to be checked
   */
  public isImage(url: string) {
    return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  /**
   * Returns whether a URL is a video or not
   * @param url URL to be checked
   */
  public isVideo(url: string) {
    return (url.match(/\.(mp4|mov|wmv|flv|avi|webm|mkv)$/) != null);
  }

  /**
   * Returns whether a URL is a YouTube video or not. If it is, returns its ID.
   * @param url URL to be checked.
   * @returns ID of the YouTube video. `null` if it isn't a YouTube video.
   */
  public getYoutubeVideoId(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
    return false;
  }

  /**
   * Shows a generic alert to report something (an error, success, etc).
   * @param title Alert title.
   * @param message Alert message.
   */
  public async showAlert(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message,
      buttons: ['OK']
    });
    alert.present();
  }

  /**
   * Shows a generic toast to report something (an error, success, etc).
   * @param message Toast message.
   */
  public async showToast(message: string) {
    const toast = await this.toast.create({
      message,
      duration: 5000,
      buttons: ['OK']
    });
    toast.present();
  }

  /**
   * Capitalises the first letter of a string.
   * @param string String to be uppercased his first letter.
   */
  public capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  /**
   * Returns an array containing the total errors of an HTTP request.
   * @param httpErrorResponse HTTP response error.
   */
  public getArrayOfHttpErrors(httpErrorResponse: HttpErrorResponse) {
    const keys = Object.keys(httpErrorResponse.error.errors);
    const errorMessages: string[] = [];
    for (const key of keys) {
      for (const error of httpErrorResponse.error.errors[key]) {
        errorMessages.push(error);
      }
    }
    return errorMessages;
  }

  /**
   * Handles a HTTP response error showing a helpful report.
   * @param httpErrorResponse HTTP response error.
   */
  public handleHttpErrorResponse(httpErrorResponse: HttpErrorResponse) {
    const errors = this.getArrayOfHttpErrors(httpErrorResponse);
    if (errors.length > 0) {
      this.showToast(errors[0]);
    }
    else {
      this.translateService.get('UNKNOWN_PETITION_ERROR').subscribe(text => {
        this.showToast(text);
      });
    }
  }

  /**
   * Toggles the dark theme in the application.
   * @param shouldToggle Toggle the dark theme or not.
   */
  public toggleDarkTheme(shouldToggle) {
    document.body.classList.toggle('dark', shouldToggle);
  }

  /**
   * Get the CSS property value by it's name. Example: `--ion-color-primary`
   * @param cssPropertyName CSS property name.
   * @returns CSS property value by it's name.
   */
  public getCssPropertyValue(cssPropertyName: string) {
    const styles = getComputedStyle(document.documentElement);
    return String(styles.getPropertyValue(cssPropertyName)).trim();
  }
}
