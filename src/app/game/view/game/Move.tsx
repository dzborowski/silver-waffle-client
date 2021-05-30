import * as React from "react";
import classnames from "classnames";
import "./Move.scss";
import {IMove} from "../../interface/IMove";
import {observer} from "mobx-react";
import {AppModel} from "../../../AppModel";

interface IProps {
    gameId: string;
    move: IMove | null;
    movePosition: number;
    moveEdgeSize: number;
}

@observer
export class Move extends React.Component<IProps> {
    protected onClick = () => {
        AppModel.socket.emit("move", {gameId: this.props.gameId, movePosition: this.props.movePosition});
    };

    protected getMoveDescription = (): string => {
        const {move} = this.props;

        if (move) {
            if (move.userId === AppModel.rootStore.auth.loggedUser.id) {
                return "X";
            }

            return "O";
        }

        return null;
    };

    public render() {
        const {move} = this.props;

        return (
            <div
                className={classnames("Move", {
                    yourMove: move && move.userId === AppModel.rootStore.auth.loggedUser.id,
                    oponentMove: move && move.userId !== AppModel.rootStore.auth.loggedUser.id,
                })}
                style={{width: this.props.moveEdgeSize, height: this.props.moveEdgeSize}}
                onClick={this.onClick}
            >
                {this.getMoveDescription()}
            </div>
        );
    }
}
