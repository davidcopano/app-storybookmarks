import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  public enable_multimedia: boolean = true;
  public enable_dark_mode: boolean = false;
  private readonly ENABLE_MULTIMEDIA_STORAGE_KEY: string = 'enable_multimedia';
  private readonly ENABLE_DARK_MODE_STORAGE_KEY: string = 'enable_dark_mode';

  constructor(private storage: Storage) { }

  public async load() {
    this.enable_multimedia = await this.storage.get(this.ENABLE_MULTIMEDIA_STORAGE_KEY);
    if(this.enable_multimedia === null) {
      this.enable_multimedia = true;
      await this.storage.set(this.ENABLE_MULTIMEDIA_STORAGE_KEY, this.enable_multimedia);
    }
    this.enable_dark_mode = await this.storage.get(this.ENABLE_DARK_MODE_STORAGE_KEY);
    if(this.enable_dark_mode === null) {
      this.enable_dark_mode = false;
      await this.storage.set(this.ENABLE_DARK_MODE_STORAGE_KEY, this.enable_dark_mode);
    }

    console.log({
      enableMultimedia: this.enable_multimedia,
      enableDarkMode: this.enable_dark_mode
    });
  }

  public async save() {
    await this.storage.set(this.ENABLE_MULTIMEDIA_STORAGE_KEY, this.enable_multimedia);
    await this.storage.set(this.ENABLE_DARK_MODE_STORAGE_KEY, this.enable_dark_mode);
  }
}
