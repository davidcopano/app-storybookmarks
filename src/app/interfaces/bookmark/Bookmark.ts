export interface Bookmark {
    id: string;
    user_id: number;
    tag_id?: any;
    folder_id: string;
    title: string;
    url: string;
    color: string;
    note?: any;
    created_at: string;
    public: boolean;
    expiration_date?: any;
}
