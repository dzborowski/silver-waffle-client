import * as React from "react";
import {customHistory, rootStore, socket} from "../../../renderer";
import {observer} from "mobx-react";
import {Button} from "react-bootstrap";
import {IGame} from "../interface/IGame";
import {GameService} from "../GameService";

@observer
export class AvailableGamesList extends React.Component {
    public componentDidMount() {
        rootStore.game.loadAvailableGames();
        socket.on("available-games-state-have-changed", () => {
            rootStore.game.loadAvailableGames();
        });
    }

    protected joinToGame = async (gameId: string) => {
        await GameService.joinToGame(gameId);
        customHistory.push(`/game/${gameId}`);
    };

    public render() {
        return (
            <div className={"AvailableGamesList"}>
                {rootStore.game.availableGames.map((game: IGame) => (
                    <div key={game.id} className={"available-game"}>
                        <div>{game.id}</div>
                        <Button variant="success" onClick={() => this.joinToGame(game.id)}>
                            Join to game
                        </Button>
                    </div>
                ))}
            </div>
        );
    }
}
