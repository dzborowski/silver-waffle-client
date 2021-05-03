import {ILoggedUser} from "./ILoggedUser";
import {ApiService} from "../api/ApiService";
import {IAuthRegisterUser} from "./IAuthRegisterUser";
import {IAuthLoginCredentials} from "./IAuthLoginCredentials";
import {IAuthLoginTokens} from "./IAuthLoginTokens";

export class AuthService {
    public static async registerUser(user:IAuthRegisterUser):Promise<ILoggedUser> {
        const registerResponse = await ApiService.api.post("/auth/register", user);

        return registerResponse.data as ILoggedUser;
    }

    public static async login(credentials: IAuthLoginCredentials):Promise<IAuthLoginTokens> {
        const loginResponse = await ApiService.api.post("/auth/login", credentials);

        return loginResponse.data as IAuthLoginTokens;
    }

    public static async getLoggedUser():Promise<ILoggedUser> {
        const loggedUserResponse = await ApiService.api.get("/auth/logged-user");

        return loggedUserResponse.data as ILoggedUser;
    }
}
