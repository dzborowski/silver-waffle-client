import * as React from "react";
import {rootStore} from "../../../renderer";
import {observer} from "mobx-react";
import {Button} from "react-bootstrap";
import {IGame} from "../interface/IGame";

@observer
export class GamesList extends React.Component {
    public componentDidMount() {
        rootStore.game.loadGames();
        // socket.on("new-game-created", () => {
        //     rootStore.game.loadGames();
        // });
    }

    protected createGame = () => {
        // socket.emit("createGame");
    };

    protected joinToGame = (gameId: string) => {};

    public render() {
        return (
            <div className={"GamesList"}>
                <Button variant="primary" onClick={this.createGame}>
                    Create Game
                </Button>

                <div className={"available-games"}>
                    {rootStore.game.games.map((game: IGame) => (
                        <div key={game.id} className={"available-game"}>
                            <div>{game.id}</div>
                            <Button variant="success" onClick={() => this.joinToGame(game.id)}>
                                Join to game
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
