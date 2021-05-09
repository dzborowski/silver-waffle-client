import {IGame} from "./interface/IGame";
import {action, observable, runInAction} from "mobx";
import {GameService} from "./GameService";

export class GameStore {
    @observable
    public games: IGame[] = [];

    @action
    public async loadGames() {
        try {
            const games = await GameService.getGames();
            runInAction(() => {
                this.games = games;
            });
        } catch (error) {
            console.log(error);
        }
    }
}
