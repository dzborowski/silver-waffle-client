import * as React from "react";
import "./Move.scss";

interface IProps {
    gameId: string;
    movePosition: number;
    moveEdgeSize: number;
}

export class Move extends React.Component<IProps> {
    protected onClick = () => {};

    public render() {
        return (
            <div
                className={"Move"}
                style={{width: this.props.moveEdgeSize, height: this.props.moveEdgeSize}}
                onClick={this.onClick}
            >
                Move
            </div>
        );
    }
}
