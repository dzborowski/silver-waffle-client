import {ILoggedUser} from "./ILoggedUser";
import {IAuthLoginTokens} from "./IAuthLoginTokens";

export interface IAuthContext {
    loggedUser: ILoggedUser | null;
    authLoginTokens: IAuthLoginTokens | null;
    setLoggedUser: (loggedUser: ILoggedUser) => void;
    setAuthLoginTokens: (authLoginTokens: IAuthLoginTokens) => void;
    isLoggedIn: () => boolean;
    logout: () => void;
}
