import * as React from "react";
import {Route, Router, Switch} from "react-router-dom";
import "./App.scss";
import {Header} from "./common/header/Header";
import {Register} from "./core/auth/view/Register";
import {Login} from "./core/auth/view/Login";
import {Game} from "./game/view/Game";
import {GameManagementPanel} from "./game/view/GameManagementPanel";
import {PrivateRoute} from "./core/auth/view/PrivateRoute";
import {AppModel} from "./AppModel";

export class App extends React.Component {
    public render() {
        return (
            <div className={"App"}>
                <Router history={AppModel.history}>
                    <Header />
                    <div className={"content"}>
                        <Switch>
                            <Route path="/login">
                                <Login />
                            </Route>
                            <Route path="/register">
                                <Register />
                            </Route>
                            <PrivateRoute path="/game/:gameId">
                                <Game />
                            </PrivateRoute>
                            <PrivateRoute path="/">
                                <GameManagementPanel />
                            </PrivateRoute>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
