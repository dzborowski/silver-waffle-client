import * as React from "react";
import {Button} from "react-bootstrap";
import {GameService} from "../GameService";

interface IState {
    gameSize: number;
}

export class GameCreator extends React.Component<{}, IState> {
    constructor(props) {
        super(props);
        this.state = {
            gameSize: 3,
        };
    }

    protected createGame = async () => {
        await GameService.createGame(this.state.gameSize);
    };

    protected changeGameSize = (event) => {
        const gameSize = Number.parseInt(event.target.value);
        this.setState({gameSize});
    };

    public render() {
        return (
            <div className={"GameCreator"}>
                <Button variant="primary" onClick={this.createGame}>
                    Create Game
                </Button>
                <select onChange={this.changeGameSize} value={this.state.gameSize}>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
        );
    }
}
