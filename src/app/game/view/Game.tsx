import * as React from "react";
import {socket} from "../../../renderer";

export class Game extends React.Component {
    public componentDidMount() {
        socket.emit("join-to-game");
    }

    public render() {
        return <div className={"Game"}>Game</div>;
    }
}
