import {IGame} from "./interface/IGame";
import {action, makeObservable, observable, runInAction} from "mobx";
import {GameService} from "./GameService";

export class GameStore {
    @observable
    public userGames: IGame[] = [];

    @observable
    public availableGames: IGame[] = [];

    constructor() {
        makeObservable(this);
    }

    @action
    public async loadUserGames() {
        try {
            const games = await GameService.getUserGames();
            runInAction(() => {
                this.userGames = games;
            });
        } catch (error) {
            console.log(error);
        }
    }

    @action
    public async loadAvailableGames() {
        try {
            const games = await GameService.getAvailableGames();
            runInAction(() => {
                this.availableGames = games;
            });
        } catch (error) {
            console.log(error);
        }
    }
}
