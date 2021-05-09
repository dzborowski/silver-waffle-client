import {ILoggedUser} from "./interface/ILoggedUser";
import {IAuthLoginTokens} from "./interface/IAuthLoginTokens";
import {action, computed, observable, runInAction} from "mobx";
import {ApiService} from "../api/ApiService";
import {AuthService} from "./AuthService";
import {IAuthLoginCredentials} from "./interface/IAuthLoginCredentials";

export class AuthStore {
    @observable
    public loggedUser: ILoggedUser = null;

    @observable
    public authLoginTokens: IAuthLoginTokens = null;

    @action
    public async initAuth() {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (accessToken && refreshToken) {
                runInAction(() => this.setAuthLoginTokens({accessToken, refreshToken}));
                const loggedUser = await AuthService.getLoggedUser();
                runInAction(() => this.setLoggedUser(loggedUser));
            }
        } catch (error) {
            console.log(error);
        }
    }

    @action
    public async login(authLoginCredentials: IAuthLoginCredentials) {
        try {
            const authLoginTokens = await AuthService.login(authLoginCredentials);
            runInAction(() => this.setAuthLoginTokens(authLoginTokens));
            const loggedUser = await AuthService.getLoggedUser();
            runInAction(() => this.setLoggedUser(loggedUser));
        } catch (error) {
            console.log(error);
        }
    }

    @action
    public setLoggedUser(loggedUser: ILoggedUser) {
        this.loggedUser = loggedUser;
    }

    @action
    public setAuthLoginTokens(authLoginTokens: IAuthLoginTokens) {
        localStorage.setItem("accessToken", authLoginTokens.accessToken);
        localStorage.setItem("refreshToken", authLoginTokens.refreshToken);
        ApiService.api.defaults.headers["Authorization"] = authLoginTokens.accessToken;
        this.authLoginTokens = authLoginTokens;
    }

    @action
    public logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        delete ApiService.api.defaults.headers["Authorization"];
        this.loggedUser = null;
        this.authLoginTokens = null;
    }

    @computed
    public isLoggedIn() {
        return !!this.loggedUser && !!this.authLoginTokens;
    }
}
