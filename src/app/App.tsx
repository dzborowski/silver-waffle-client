import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "./App.scss";
import {Header} from "./common/header/Header";
import {Register} from "./auth/Register";
import {Login} from "./auth/Login";
import {rootStore} from "../renderer";

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
                            <Route path="/">
                                <Register />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
