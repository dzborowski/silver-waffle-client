import * as React from "react";
import * as ReactDOM from "react-dom";
import {io} from "socket.io-client";
import {createBrowserHistory} from "history";
import {App} from "./app/App";
import {ApiService} from "./app/core/api/ApiService";
import {RootStore} from "./app/core/RootStore";
import {AppConfig} from "./app/AppConfig";
import {AuthTokensUtil} from "./app/core/auth/AuthTokensUtil";

ApiService.init();

export const customHistory = createBrowserHistory({forceRefresh: true} as any);
export const rootStore = new RootStore();
export const socket = io(AppConfig.getSocketUrl(), {
    auth: (cb) => {
        const data = {token: AuthTokensUtil.getAccessToken()};
        cb(data);
    },
});

ReactDOM.render(<App />, document.getElementById("root"));
