import * as React from "react";
import * as _ from "lodash";
import classnames from "classnames";
import {AppModel} from "../../../AppModel";
import {IGame} from "../../interface/IGame";
import {IMove} from "../../interface/IMove";
import {RouteComponentProps} from "react-router";
import {GameService} from "../../GameService";
import {Move} from "./Move";
import "./Game.scss";
import {GameState} from "../../GameState";
import {GameEndResult} from "../../GameEndResult";
import {NotificationUtil} from "../../../core/notifications/NotificationUtil";

interface IProps extends RouteComponentProps<{gameId: string}> {}

interface IState {
    game: IGame;
    moves: IMove[];
}

export class Game extends React.Component<IProps, IState> {
    protected static readonly MOVE_EDGE_SIZE = 100;

    constructor(props: IProps) {
        super(props);

        this.state = {
            game: null,
            moves: [],
        };
    }

    public componentDidMount() {
        AppModel.socket.emit("join-to-game", this.gameId);
        AppModel.socket.on("move-was-made", this.loadGameIngredients);
        AppModel.socket.on("player-joined-to-game", () => {
            NotificationUtil.info({message: "Oponent joined to game"});
        });
        AppModel.socket.on("player-leave-game", () => {
            NotificationUtil.info({message: "Oponent leave game"});
        });
        this.loadGameIngredients();
    }

    public componentWillUnmount() {
        AppModel.socket.emit("leave-game", this.gameId);
    }

    protected loadGameIngredients = async () => {
        const game = await GameService.getGame(this.gameId);
        const moves = await GameService.getGameMoves(this.gameId);
        this.setState({game, moves});
    };

    protected get gameId(): string {
        return this.props.match.params.gameId;
    }

    protected getMoveForPosition(position: number): IMove {
        return this.state.moves.find((move: IMove) => move.position === position);
    }

    protected getGameEndResult(): GameEndResult {
        const {game} = this.state;
        if (game.state === GameState.FINISHED) {
            if (game.winnerId === AppModel.rootStore.auth.loggedUser.id) {
                return GameEndResult.WIN;
            } else if (game.winnerId === null) {
                return GameEndResult.DRAW;
            }
            return GameEndResult.LOST;
        }
    }

    protected getGameEndResultDescription(): string {
        const gameEndResult = this.getGameEndResult();
        switch (gameEndResult) {
            case GameEndResult.WIN:
                return "You win!";
            case GameEndResult.DRAW:
                return "Draw";
            case GameEndResult.LOST:
                return "You lost :<";
            default:
                return null;
        }
    }

    public render() {
        const {game} = this.state;

        if (!game) {
            return null;
        }

        const gameEdgeSize = game.size * Game.MOVE_EDGE_SIZE;
        const movesPositions = _.range(0, game.size ** 2);
        const gameEndResult = this.getGameEndResult();
        const gameEndResultDescription = this.getGameEndResultDescription();

        return (
            <div className={"Game"}>
                <h3>Game {game.id}</h3>
                {gameEndResultDescription && (
                    <div
                        className={classnames("result", {
                            "result-win": gameEndResult === GameEndResult.WIN,
                            "result-draw": gameEndResult === GameEndResult.DRAW,
                            "result-lost": gameEndResult === GameEndResult.LOST,
                        })}
                    >
                        {gameEndResultDescription}
                    </div>
                )}
                <div className={"moves-wrapper"}>
                    <div
                        className={"moves"}
                        style={{
                            width: gameEdgeSize,
                            height: gameEdgeSize,
                        }}
                    >
                        {movesPositions.map((movePosition: number) => {
                            const move = this.getMoveForPosition(movePosition);
                            return (
                                <Move
                                    key={movePosition}
                                    move={move}
                                    gameId={game.id}
                                    movePosition={movePosition}
                                    moveEdgeSize={Game.MOVE_EDGE_SIZE}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
