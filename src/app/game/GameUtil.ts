import {GameEndResult} from "./GameEndResult";
import {GameState} from "./GameState";
import {AppModel} from "../AppModel";
import {IGame} from "./interface/IGame";

export class GameUtil {
    public static getGameEndResult(game: IGame): GameEndResult {
        if (game.state === GameState.FINISHED) {
            if (game.winnerId === AppModel.rootStore.auth.loggedUser.id) {
                return GameEndResult.WIN;
            } else if (game.winnerId === null) {
                return GameEndResult.DRAW;
            }
            return GameEndResult.LOST;
        }
    }

    public static getGameEndResultDescription(game: IGame): string {
        const gameEndResult = GameUtil.getGameEndResult(game);
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
}
