import {AuthStore} from "./auth/AuthStore";
import {GameStore} from "../game/GameStore";

export class RootStore {
    public auth: AuthStore;
    public game: GameStore;

    constructor() {
        this.auth = new AuthStore();
        this.game = new GameStore();
    }
}
