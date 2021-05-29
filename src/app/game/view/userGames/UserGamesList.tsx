import * as React from "react";
import {observer} from "mobx-react";
import {Button, Table} from "react-bootstrap";
import {IGame} from "../../interface/IGame";
import {AppModel} from "../../../AppModel";
import "./UserGamesList.scss";

@observer
export class UserGamesList extends React.Component {
    public componentDidMount() {
        AppModel.rootStore.game.loadUserGames();
    }

    protected joinToGame = (gameId: string) => {
        AppModel.history.push(`/game/${gameId}`);
    };

    protected getWinnerDescription = (game: IGame) => {};

    public render() {
        return (
            <div className={"UserGamesList"}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Winner</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {AppModel.rootStore.game.userGames.map((game: IGame) => (
                            <tr key={game.id}>
                                <td>{game.id}</td>
                                <td>{game.state}</td>
                                <td></td>
                                <td>
                                    <Button variant="success" onClick={() => this.joinToGame(game.id)}>
                                        Join to game
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}
