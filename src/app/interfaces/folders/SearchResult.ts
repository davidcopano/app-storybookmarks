import { Bookmark } from '../bookmark/Bookmark';
import { Folder } from './Folder';

export interface SearchResult {
    bookmarks: Bookmark[];
    folders: Folder[];
}
