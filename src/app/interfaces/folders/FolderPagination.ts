import { Folder } from './Folder';

export interface FolderPagination {
    current_page: number;
    data: Folder[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url?: any;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to: number;
    total: number;
}
