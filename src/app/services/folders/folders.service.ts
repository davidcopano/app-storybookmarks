import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { UtilitiesService } from '../utilities/utilities.service';
import { Folder, BookmarkPagination } from 'src/app/interfaces';
import { Subject } from 'rxjs';
import { FolderPagination } from 'src/app/interfaces/folders/FolderPagination';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoldersService {

  public folders: Folder[] = [];
  public isLoading = true;
  public loadedFirstTime = false;
  private page = 1;
  private $foldersLoaded = new Subject();
  private httpOptions: {
    headers: HttpHeaders
  };

  constructor(private httpClient: HttpClient, public userService: UserService) {
    if (userService.loggedUser) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.userService.loggedUser.api_token}`
        })
      };
    }
    else {
      console.warn('No hay usuario logeado actualmente - folders.service.ts');
    }
  }

  /**
   * Get folders from system.
   */
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

  /**
   * Get bookmarks by folder ID.
   * @param folder Folder which will have the bookmarks
   * @param page Page number
   */
  public getBookmarksById(folder: Folder, page = 1) {
    const bookmarkPagination = this.httpClient.get<BookmarkPagination>(`${environment.apiUrl}folders/${folder.id}/bookmarks?page=${page}`, this.httpOptions);
    return bookmarkPagination.pipe(map(value => value.data)).toPromise();
  }

  /**
   * Add a new folder to the system.
   * @param folder Folder to be saved
   */
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

  /**
   * Edit a folder from the system.
   * @param folder Folder to be edited.
   */
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

  /**
   * Delete a folder from the system.
   * @param folder Folder to be deleted
   */
  public async delete(folder: Folder) {
    try {
      await this.httpClient.delete<Folder>(`${environment.apiUrl}folders/${folder.id}`, this.httpOptions).toPromise();
      let index = this.folders.findIndex(item => item.id == folder.id);
      this.folders.splice(index, 1);
      return { success: true };
    }
    catch (error) {
      return { success: false, error };
    }
  }

  /**
   * Listens when folders are loaded.
   */
  public onFoldersLoaded() {
    return this.$foldersLoaded.asObservable();
  }

  /**
   * Sets an authorization token when using folder-related methods.
   * @param api_token API token
   */
  public setAuthToken(api_token: string) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${api_token}`
      })
    };
  }

  /**
   * Reset all service variables.
   */
  public reset() {
    this.folders = [];
    this.isLoading = true;
    this.loadedFirstTime = false;
    this.page = 1;
    this.$foldersLoaded = new Subject();
  }
}
