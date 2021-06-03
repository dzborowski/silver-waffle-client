import * as React from "react";
import {observer} from "mobx-react";
import {Button} from "react-bootstrap";
import {IGame} from "../../interface/IGame";
import {GameService} from "../../GameService";
import {AppModel} from "../../../AppModel";
import "./AvailableGamesList.scss";

@observer
export class AvailableGamesList extends React.Component {
    public componentDidMount() {
        AppModel.rootStore.game.loadAvailableGames();
        AppModel.socket.on("new-game-was-created", async () => {
            AppModel.rootStore.game.loadAvailableGames();
        });
        AppModel.socket.on("player-joined-to-available-game", () => {
            AppModel.rootStore.game.loadAvailableGames();
        });
    }

    protected joinToGame = async (gameId: string) => {
        await GameService.joinToGame(gameId);
        AppModel.history.push(`/game/${gameId}`);
    };

    public render() {
        return (
            <div className={"AvailableGamesList"}>
                {AppModel.rootStore.game.availableGames.map((game: IGame) => (
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
