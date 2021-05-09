import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from "./app/App";
import {ApiService} from "./app/core/api/ApiService";
import {RootStore} from "./app/core/RootStore";

ApiService.init();

export const rootStore = new RootStore();

ReactDOM.render(<App />, document.getElementById("root"));
