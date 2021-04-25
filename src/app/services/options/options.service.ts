import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { UtilitiesService } from '../utilities/utilities.service';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  public enable_multimedia = true;
  public enable_dark_mode = false;
  private readonly ENABLE_MULTIMEDIA_STORAGE_KEY: string = 'enable_multimedia';
  private readonly ENABLE_DARK_MODE_STORAGE_KEY: string = 'enable_dark_mode';

  constructor(private utilitiesService: UtilitiesService) { }

  /**
   * Load user options.
   */
  public async load() {
    let { value } = await Storage.get({
      key: this.ENABLE_MULTIMEDIA_STORAGE_KEY
    });
    this.enable_multimedia = value == 'true' ? true : null;
    if (this.enable_multimedia === null) {
      this.enable_multimedia = true;
      await Storage.set({
        key: this.ENABLE_MULTIMEDIA_STORAGE_KEY,
        value: 'true'
      });
    }
    let resultDarkMode = await Storage.get({
      key: this.ENABLE_DARK_MODE_STORAGE_KEY
    });
    this.enable_dark_mode = resultDarkMode.value == 'true' ? true : null;
    if (this.enable_dark_mode === null) {
      this.enable_dark_mode = false;
      await Storage.set({
        key: this.ENABLE_DARK_MODE_STORAGE_KEY,
        value: 'false'
      }, );
    }
    if (this.enable_dark_mode) {
      this.utilitiesService.toggleDarkTheme(this.enable_dark_mode);
    }
  }

  /**
   * Save options in local storage.
   */
  public async save() {
    await Storage.set({
      key: this.ENABLE_MULTIMEDIA_STORAGE_KEY,
      value: this.enable_multimedia.toString()
    });
    await Storage.set({
      key: this.ENABLE_DARK_MODE_STORAGE_KEY,
      value: this.enable_dark_mode.toString()
    });
    // await this.storage.set(this.ENABLE_MULTIMEDIA_STORAGE_KEY, this.enable_multimedia);
    // await this.storage.set(this.ENABLE_DARK_MODE_STORAGE_KEY, this.enable_dark_mode);
  }
}
