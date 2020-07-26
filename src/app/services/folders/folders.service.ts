import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { UtilitiesService } from '../utilities/utilities.service';
import { Folder } from 'src/app/interfaces';
import { Subject } from 'rxjs';
import { FolderPagination } from 'src/app/interfaces/folders/FolderPagination';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoldersService {

  public folders: Folder[] = [];
  public isLoading: boolean = true;
  public loadedFirstTime: boolean = false;
  private page: number = 1;
  private $foldersLoaded = new Subject();
  private httpOptions: {
    headers: HttpHeaders
  }

  constructor(private httpClient: HttpClient, public userService: UserService, private utilitiesService: UtilitiesService) {
    if (userService.loggedUser) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.userService.loggedUser.api_token}`
        })
      };
    }
    else {
      console.error('No hay usuario logeado actualmente - folders.service.ts');
    }
  }

  public get() {
    if (!this.loadedFirstTime || this.page != 1) {
      this.isLoading = true;
      const folderPagination = this.httpClient.get<FolderPagination>(`${environment.apiUrl}folders?page=${this.page}`, this.httpOptions);
      const foldersObservable = folderPagination.pipe(map(value => value.data));
      foldersObservable.subscribe(folders => {
        this.folders.push(...folders);
        this.isLoading = false;
        this.loadedFirstTime = true;
        this.page++;
        this.$foldersLoaded.next();
      });
    }
  }

  public async add(folder: Folder) {
    try {
      await this.httpClient.post<Folder>(`${environment.apiUrl}folders`, folder, this.httpOptions).toPromise();
      this.folders.unshift(folder);
      return { success: true };
    }
    catch (error) {
      return { success: false, error };
    }
  }

  public async edit(folder: Folder) {
    try {
      await this.httpClient.patch<Folder>(`${environment.apiUrl}folders/${folder.id}`, folder, this.httpOptions).toPromise();
      let index = this.folders.findIndex(item => item.id == folder.id);
      this.folders[index] = folder;
      return { success: true };
    }
    catch (error) {
      return { success: false, error };
    }
  }

  public onFoldersLoaded() {
    return this.$foldersLoaded.asObservable();
  }

  public setAuthToken(api_token: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_token}`
      })
    };
  }

  public reset() {
    this.folders = [];
    this.isLoading = true;
    this.loadedFirstTime = false;
    this.page = 1;
    this.$foldersLoaded = new Subject();
  }
}
