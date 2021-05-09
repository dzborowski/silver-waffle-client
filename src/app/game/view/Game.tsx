import * as React from "react";
import {IGame} from "../interface/IGame";

interface IProps {
    game: IGame;
}

export class Game extends React.Component<IProps> {
    public render() {
        return <div className={"Game"}></div>;
    }
}
