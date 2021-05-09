import {IGame} from "./interface/IGame";
import {ApiService} from "../core/api/ApiService";
import {IMove} from "./interface/IMove";

export class GameService {
    public static async getGames(): Promise<IGame[]> {
        const response = await ApiService.api.get("/game");
        return response.data as IGame[];
    }

    public static async getGameMoves(gameId: string): Promise<IMove[]> {
        const response = await ApiService.api.get(`/game/${gameId}/moves`);
        return response.data as IMove[];
    }
}
