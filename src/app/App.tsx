import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.scss";
import {Header} from "./common/header/Header";
import {ApiService} from "./api/ApiService";
import {Register} from "./auth/Register";
import {AuthService} from "./auth/AuthService";
import {IAuthContext} from "./auth/IAuthContext";
import {ILoggedUser} from "./auth/ILoggedUser";
import {IAuthLoginTokens} from "./auth/IAuthLoginTokens";
import {Login} from "./auth/Login";
import {AuthContext} from "./auth/AuthContext";

interface IProps {}

interface IState {
    authContext: IAuthContext;
}

export class App extends React.Component<IProps, IState> {
    constructor(props:IProps) {
        super(props);

        this.state = {
            authContext: {
                loggedUser: null,
                authLoginTokens: null,
                setLoggedUser: this.setLoggedUser,
                setAuthLoginTokens: this.setAuthLoginTokens,
                isLoggedIn: this.isLoggedIn,
                logout: this.logout,
            },
        };
    }

    public async componentDidMount() {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (accessToken && refreshToken) {
            this.setAuthLoginTokens({accessToken, refreshToken});
            const loggedUser = await AuthService.getLoggedUser();
            this.setLoggedUser(loggedUser);
        }
    }

    public setLoggedUser = (loggedUser:ILoggedUser) => {
        this.setState((state) => ({
            ...state,
            authContext: {
                ...state.authContext,
                loggedUser,
            },
        }));
    };

    public setAuthLoginTokens = (authLoginTokens: IAuthLoginTokens) => {
        localStorage.setItem("accessToken", authLoginTokens.accessToken);
        localStorage.setItem("refreshToken", authLoginTokens.refreshToken);
        ApiService.api.defaults.headers["Authorization"] = authLoginTokens.accessToken;
        this.setState((state) => ({
            ...state,
            authContext: {
                ...state.authContext,
                authLoginTokens,
            },
        }));
    };

    public isLoggedIn = () => {
        return !!this.state.authContext.loggedUser && !!this.state.authContext.authLoginTokens;
    };

    public logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        delete ApiService.api.defaults.headers["Authorization"];
        this.setState((state) => ({
            ...state,
            authContext: {
                ...state.authContext,
                loggedUser: null,
                authLoginTokens: null,
            },
        }));
    }

    public render() {
        return (
            <div className={"App"}>
                <Router>
                    <AuthContext.Provider value={this.state.authContext}>
                        <Header/>
                        <div className={"content"}>
                            <Switch>
                                <Route path="/login">
                                    <Login/>
                                </Route>
                                <Route path="/register">
                                    <Register/>
                                </Route>
                                <Route path="/">
                                    <Register/>
                                </Route>
                            </Switch>
                        </div>
                    </AuthContext.Provider>
                </Router>
            </div>
        );
    }
}
