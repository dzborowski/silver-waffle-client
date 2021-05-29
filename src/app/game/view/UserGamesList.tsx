import * as React from "react";
import {observer} from "mobx-react";
import {Button} from "react-bootstrap";
import {IGame} from "../interface/IGame";
import {AppModel} from "../../AppModel";

@observer
export class UserGamesList extends React.Component {
    public componentDidMount() {
        AppModel.rootStore.game.loadUserGames();
    }

    protected joinToGame = (gameId: string) => {
        AppModel.history.push(`/game/${gameId}`);
    };

    public render() {
        return (
            <div className={"UserGamesList"}>
                {AppModel.rootStore.game.availableGames.map((game: IGame) => (
                    <div key={game.id} className={"user-game"}>
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
