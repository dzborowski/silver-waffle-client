import * as React from "react";
import {Route, Router, Switch} from "react-router-dom";
import "./App.scss";
import {Header} from "./common/header/Header";
import {Register} from "./core/auth/view/Register";
import {Login} from "./core/auth/view/Login";
import {customHistory, rootStore} from "../renderer";
import {Game} from "./game/view/Game";
import {GameManagementPanel} from "./game/view/GameManagementPanel";

export class App extends React.Component {
    public async componentDidMount() {
        await rootStore.auth.initAuth();
    }

    public render() {
        return (
            <div className={"App"}>
                <Router history={customHistory}>
                    <Header />
                    <div className={"content"}>
                        <Switch>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <Route path="/game/:gameId">
                                <Game />
                            </Route>
                            <Route path="/">
                                <GameManagementPanel />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
