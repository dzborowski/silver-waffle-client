import * as React from "react";
import {AppModel} from "../../AppModel";

export class Game extends React.Component {
    public componentDidMount() {
        AppModel.socket.emit("join-to-game");
    }

    public render() {
        return <div className={"Game"}>Game</div>;
    }
}
