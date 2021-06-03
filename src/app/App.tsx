import * as React from "react";
import {Route, Router, Switch} from "react-router-dom";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "./App.scss";
import {Header} from "./common/header/Header";
import {Register} from "./core/auth/view/Register";
import {Login} from "./core/auth/view/Login";
import {Game} from "./game/view/game/Game";
import {AvailableGamesCockpit} from "./game/view/availableGames/AvailableGamesCockpit";
import {PrivateRoute} from "./core/auth/view/PrivateRoute";
import {AppModel} from "./AppModel";
import {UserGamesCockpit} from "./game/view/userGames/UserGamesCockpit";
import {NotFound} from "./common/NotFound";

export class App extends React.Component {
    public render() {
        return (
            <div className={"App"}>
                <ReactNotification />
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
                            <PrivateRoute path="/my-games">
                                <UserGamesCockpit />
                            </PrivateRoute>
                            <PrivateRoute path="/available-games">
                                <AvailableGamesCockpit />
                            </PrivateRoute>
                            <PrivateRoute path="/game/:gameId" component={Game} />
                            <Route path={"*"}>
                                <NotFound />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
