import {GameState} from "../GameState";

export interface IGame {
    id: string;
    size: number;
    state: GameState;
    createdAt: Date;
    updatedAt: Date;
}
