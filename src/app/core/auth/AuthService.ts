import {ILoggedUser} from "./interface/ILoggedUser";
import {ApiService} from "../api/ApiService";
import {IAuthRegisterUser} from "./interface/IAuthRegisterUser";
import {IAuthLoginCredentials} from "./interface/IAuthLoginCredentials";
import {IAuthLoginTokens} from "./interface/IAuthLoginTokens";

export class AuthService {
    public static async registerUser(user: IAuthRegisterUser): Promise<ILoggedUser> {
        const response = await ApiService.api.post("/auth/register", user);
        return response.data as ILoggedUser;
    }

    public static async login(credentials: IAuthLoginCredentials): Promise<IAuthLoginTokens> {
        const response = await ApiService.api.post("/auth/login", credentials);
        return response.data as IAuthLoginTokens;
    }

    public static async getLoggedUser(): Promise<ILoggedUser> {
        const response = await ApiService.api.get("/auth/logged-user");
        return response.data as ILoggedUser;
    }
}
