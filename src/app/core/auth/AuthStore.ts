import {ILoggedUser} from "./interface/ILoggedUser";
import {IAuthLoginTokens} from "./interface/IAuthLoginTokens";
import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {ApiService} from "../api/ApiService";
import {IAuthLoginCredentials} from "./interface/IAuthLoginCredentials";
import {AuthTokensUtil} from "./AuthTokensUtil";
import {AuthService} from "./AuthService";

export class AuthStore {
    @observable
    public loggedUser: ILoggedUser = null;

    @observable
    public authLoginTokens: IAuthLoginTokens = null;

    constructor() {
        makeObservable(this);
    }

    @action
    public async initAuth() {
        try {
            const accessToken = AuthTokensUtil.getAccessToken();
            const refreshToken = AuthTokensUtil.getRefreshToken();

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
        AuthTokensUtil.setAccessToken(authLoginTokens.accessToken);
        AuthTokensUtil.setRefreshToken(authLoginTokens.refreshToken);
        ApiService.api.defaults.headers["Authorization"] = authLoginTokens.accessToken;
        this.authLoginTokens = authLoginTokens;
    }

    @action
    public logout() {
        AuthTokensUtil.removeAccessToken();
        AuthTokensUtil.removeRefreshToken();
        delete ApiService.api.defaults.headers["Authorization"];
        this.loggedUser = null;
        this.authLoginTokens = null;
    }

    @computed
    public get isLoggedIn() {
        return !!this.loggedUser && !!this.authLoginTokens;
    }
}
