export interface GoogleLoginResponse {
    accessToken: string;
    expires: number;
    expires_in: number;
    email: string;
    userId: string;
    displayName: string;
    familyName: string;
    givenName: string;
}
