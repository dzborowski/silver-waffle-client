import * as React from "react";
import {rootStore} from "../../../renderer";
import {observer} from "mobx-react";
import {Button} from "react-bootstrap";

@observer
export class GamesList extends React.Component {
    public componentDidMount() {
        rootStore.game.loadGames();
        // socket.on("new-game-created", () => {
        //     rootStore.game.loadGames();
        // });
    }

    protected createGame = () => {
        rootStore.game.loadGames();
        // socket.emit("createGame");
    };

    protected joinToGame = (gameId: string) => {};

    public render() {
        console.log("rootStore.game.games:", rootStore.game.games);
        return (
            <div className={"GamesList"}>
                <Button variant="primary" onClick={this.createGame}>
                    Create Game
                </Button>

                <div className={"available-games"}>
                    {rootStore.game.games[0]?.id}
                    {/* {rootStore.game.games.map((game: IGame) => (*/}
                    {/*    <div key={game.id} className={"available-game"}>*/}
                    {/*         <div>{game.id}</div>*/}
                    {/*         <Button variant="success" onClick={() => this.joinToGame(game.id)}>*/}
                    {/*            Join to game*/}
                    {/*         </Button>*/}
                    {/*    </div>*/}
                    {/* ))}*/}
                </div>
            </div>
        );
    }
}
