export class AuthTokensUtil {
    protected static readonly ACCESS_TOKEN_KEY = "accessToken";
    protected static readonly REFRESH_TOKEN_KEY = "refreshToken";

    public static getAccessToken(): string {
        return localStorage.getItem(AuthTokensUtil.ACCESS_TOKEN_KEY);
    }

    public static setAccessToken(token: string): void {
        localStorage.setItem(AuthTokensUtil.ACCESS_TOKEN_KEY, token);
    }

    public static removeAccessToken(): void {
        localStorage.removeItem(AuthTokensUtil.ACCESS_TOKEN_KEY);
    }

    public static getRefreshToken(): string {
        return localStorage.getItem(AuthTokensUtil.REFRESH_TOKEN_KEY);
    }

    public static setRefreshToken(token: string): void {
        localStorage.setItem(AuthTokensUtil.REFRESH_TOKEN_KEY, token);
    }

    public static removeRefreshToken(): void {
        localStorage.removeItem(AuthTokensUtil.REFRESH_TOKEN_KEY);
    }
}
