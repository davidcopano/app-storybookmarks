import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpErrorResponse } from '@angular/common/http';
import { LangService } from '../lang/lang.service';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  private loading: HTMLIonLoadingElement;

  constructor(private loadingCtrl: LoadingController, private alertCtrl: AlertController, private platform: Platform, private toast: ToastController, private storage: Storage, private langService: LangService, private translateService: TranslateService, private spinnerDialog: SpinnerDialog, private clipboard: Clipboard) { }

  /**
   * Cierra la sesión borrando todos los datos del usuario actual
   */
  public closeSession(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.storage.ready().then(() => {
        this.storage.remove('userData').then(() => {
          resolve();
        }).catch(error => {
          reject('Error al borrar datos de sesión');
        })
      }).catch(error => {
        reject('Error al obtener tus datos');
      })
    })
  }

  /**
   * Muestra loading
   * @param message Mensaje del loading (opcional)
   */
  async showLoading(message?: string, duration?: number) {
    if (this.isInMobileDevice()) {
      this.spinnerDialog.show(message, null);
    }
    else {
      this.loading = await this.loadingCtrl.create({
        message: message ? message : null,
        duration: duration ? duration : null
      });
      return this.loading.present();
    }
  }

  /**
   * Quita el loading cargado (arreglado)
   */
  public dismissLoading() {
    if (this.isInMobileDevice()) {
      this.spinnerDialog.hide();
    }
    else {
      return this.loading.dismiss();
    }
  }

  /**
   * Copia el texto pasado al portapapeles del dispositivo
   * @param text Texto a copiar en el portapapeles
   */
  public copyToClipboard(text: string) {
    if (this.isInMobileDevice()) {
      this.clipboard.copy(text);
    }
    else {
      let aux = document.createElement("input");
      aux.setAttribute("value", text);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
    }
  }

  /**
   * Devuelve si se está ejecutando la aplicación en un dispositivo móvil
   */
  isInMobileDevice() {
    return this.platform.is('mobile') ? true : false;
  }

  /**
   * Devuelve el sistema operativo del dispositivo
   */
  public getPlatform() {
    return this.platform.is('ios') ? 'ios' : 'android';
  }

  /**
   * Devuelve el nombre del archivo pasado (incluida la extensión)
   * @param path Ruta del archivo
   */
  public getFileName(path: string) {
    return path.split('/').pop();
  }

  /**
   * Devuelve la extensión del archivo pasado
   * @param path Ruta del archivo
   */
  public getFileExtension(path: string) {
    return path.split('.').pop().toLowerCase();
  }

  /**
   * Muestra un alert genérico para notificar algo (un error, éxito, etc)
   * @param title Título del alert
   * @param message Mensaje del alert
   */
  public async showAlert(title: string, message: string) {
    let alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

  /**
   * Muestra un toast genérico para notificar algo (un error, éxito, etc)
   * @param message Mensaje del toast
   */
  public async showToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 5000,
      buttons: ['OK']
    });
    toast.present();
  }

  public capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * Devuelve un array conteniendo los errores totales de una petición HTTP
   * @param httpErrorResponse Error HTTP
   */
  private getArrayOfHttpErrors(httpErrorResponse: HttpErrorResponse) {
    let keys = Object.keys(httpErrorResponse.error.errors);
    let errorMessages: string[] = [];
    for (let key of keys) {
      for (let error of httpErrorResponse.error.errors[key]) {
        errorMessages.push(error);
      }
    }
    return errorMessages;
  }

  public handleHttpErrorResponse(httpErrorResponse: HttpErrorResponse) {
    let errors = this.getArrayOfHttpErrors(httpErrorResponse);
    if (errors.length > 0) {
      this.showToast(errors[0]);
    }
    else {
      this.translateService.get('UNKNOWN_PETITION_ERROR').subscribe(text => {
        this.showToast(text);
      })
    }
  }
}