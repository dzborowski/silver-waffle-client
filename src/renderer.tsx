import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from "./app/App";
import {ApiService} from "./app/api/ApiService";

ApiService.init();

ReactDOM.render(<App />, document.getElementById("root"));
