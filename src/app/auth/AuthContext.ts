import * as React from "react";
import {IAuthContext} from "./IAuthContext";
import {IAuthLoginTokens} from "./IAuthLoginTokens";
import {ILoggedUser} from "./ILoggedUser";

export const AuthContext = React.createContext<IAuthContext>({
    loggedUser: null,
    authLoginTokens: null,
    setLoggedUser: (loggedUser:ILoggedUser) => {},
    setAuthLoginTokens: (authLoginTokens: IAuthLoginTokens) => {},
    isLoggedIn: () => false,
    logout: () => {},
});
