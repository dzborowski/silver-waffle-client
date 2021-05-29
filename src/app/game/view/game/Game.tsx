import * as React from "react";
import * as _ from "lodash";
import {AppModel} from "../../../AppModel";
import {IGame} from "../../interface/IGame";
import {IMove} from "../../interface/IMove";
import {RouteComponentProps} from "react-router";
import {GameService} from "../../GameService";
import {Move} from "./Move";
import "./Game.scss";

interface IProps extends RouteComponentProps<{gameId: string}> {}

interface IState {
    game: IGame;
    moves: IMove[];
}

export class Game extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            game: null,
            moves: [],
        };
    }

    public async componentDidMount() {
        AppModel.socket.emit("join-to-game");
        const game = await GameService.getGame(this.gameId);
        const moves = await GameService.getGameMoves(this.gameId);
        this.setState({game, moves});
    }

    protected get gameId(): string {
        return this.props.match.params.gameId;
    }

    public render() {
        const {game, moves} = this.state;

        if (!game) {
            return null;
        }

        const moveEdgeSize = 100;
        const gameEdgeSize = game.size * moveEdgeSize;
        const movesPositions = _.range(0, game.size ** 2);

        return (
            <div className={"Game"}>
                <h3>Game {game.id}</h3>
                <div className={"moves-wrapper"}>
                    <div
                        className={"moves"}
                        style={{
                            width: gameEdgeSize,
                            height: gameEdgeSize,
                        }}
                    >
                        {movesPositions.map((movePosition: number) => {
                            return <Move gameId={game.id} movePosition={movePosition} moveEdgeSize={moveEdgeSize} />;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
