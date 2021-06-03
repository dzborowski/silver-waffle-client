import {ApiService} from "./core/api/ApiService";
import {AppModel} from "./AppModel";
import {createBrowserHistory} from "history";
import {RootStore} from "./core/RootStore";
import {io} from "socket.io-client";
import {AppConfig} from "./AppConfig";
import {AuthTokensUtil} from "./core/auth/AuthTokensUtil";
import * as ReactDOM from "react-dom";
import {App} from "./App";
import * as React from "react";
import {NotificationUtil} from "./core/notifications/NotificationUtil";

export class AppInitializer {
    public static async init() {
        ApiService.init();
        AppInitializer.initHistory();
        AppInitializer.initStore();
        AppInitializer.initSocket();
        await AppModel.rootStore.auth.initAuth();
        AppInitializer.renderView();
    }

    protected static initHistory() {
        AppModel.history = createBrowserHistory();
    }

    protected static initStore() {
        AppModel.rootStore = new RootStore();
    }

    protected static initSocket() {
        AppModel.socket = io(AppConfig.getSocketUrl(), {
            auth: (cb) => {
                const data = {token: AuthTokensUtil.getAccessToken()};
                cb(data);
            },
        });

        AppModel.socket.on("custom-error", (error) => {
            NotificationUtil.danger({message: error?.errorMessage ?? error});
        });

        AppModel.socket.on("connect_error", (error) => {
            console.log(error?.message ?? error);
        });
    }

    protected static renderView() {
        ReactDOM.render(<App />, document.getElementById("root"));
    }
}
