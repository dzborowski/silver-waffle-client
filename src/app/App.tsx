import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.scss";
import {Header} from "./common/header/Header";
import {Register} from "./core/auth/view/Register";
import {Login} from "./core/auth/view/Login";
import {rootStore} from "../renderer";
import {GamesList} from "./game/view/GamesList";
import {Game} from "./game/view/Game";

export class App extends React.Component {
    public async componentDidMount() {
        await rootStore.auth.initAuth();
    }

    public render() {
        return (
            <div className={"App"}>
                <Router>
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
                                <GamesList />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
