export class AuthUtil {
    public static getAccessToken(): string {
        return localStorage.getItem("accessToken");
    }
}
