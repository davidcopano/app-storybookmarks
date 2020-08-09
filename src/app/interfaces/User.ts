export interface User {
    id: number;
    username: string;
    username_canonical: string;
    email: string;
    email_canonical: string;
    enabled: boolean;
    salt?: any;
    password: string;
    last_login: string;
    confirmation_token?: any;
    password_requested_at?: any;
    roles: any[];
    created_at: string;
    enable_multimedia: boolean;
    api_token: string;
}
