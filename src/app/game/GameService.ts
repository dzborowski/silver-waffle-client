import {IGame} from "./interface/IGame";
import {ApiService} from "../core/api/ApiService";
import {IMove} from "./interface/IMove";

export class GameService {
    public static async createGame(gameSize: number): Promise<IGame> {
        const response = await ApiService.api.post("/game", {gameSize});
        return response.data as IGame;
    }

    public static async joinToGame(gameId: string): Promise<void> {
        await ApiService.api.post(`/game/${gameId}/join-to-game`);
    }

    public static async getUserGames(): Promise<IGame[]> {
        const response = await ApiService.api.get("/game");
        return response.data as IGame[];
    }

    public static async getAvailableGames(): Promise<IGame[]> {
        const response = await ApiService.api.get("/game/available-games");
        return response.data as IGame[];
    }

    public static async getGameMoves(gameId: string): Promise<IMove[]> {
        const response = await ApiService.api.get(`/game/${gameId}/moves`);
        return response.data as IMove[];
    }
}
