import {History, Location} from "history";
import {RootStore} from "./core/RootStore";
import {Socket} from "socket.io-client";

interface IHistoryState {
    from?: Location;
}

export class AppModel {
    public static history: History<IHistoryState>;
    public static rootStore: RootStore;
    public static socket: Socket;
}
