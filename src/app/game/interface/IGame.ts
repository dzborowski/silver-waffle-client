import {GameState} from "../GameState";

export interface IGame {
    id: string;
    size: number;
    state: GameState;
    oponentId: string;
    winnerId: string;
    createdAt: Date;
    updatedAt: Date;
}
