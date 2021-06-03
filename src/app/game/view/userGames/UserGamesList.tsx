import * as React from "react";
import {observer} from "mobx-react";
import {Button, Table} from "react-bootstrap";
import {IGame} from "../../interface/IGame";
import {AppModel} from "../../../AppModel";
import "./UserGamesList.scss";
import {GameUtil} from "../../GameUtil";

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
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Status</th>
                            <th>End result</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {AppModel.rootStore.game.userGames.map((game: IGame) => (
                            <tr key={game.id}>
                                <td>{game.id}</td>
                                <td>{game.state}</td>
                                <td>{GameUtil.getGameEndResultDescription(game)}</td>
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
