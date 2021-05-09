import {AuthStore} from "../auth/AuthStore";

export class RootStore {
    public auth: AuthStore = null;

    constructor() {
        this.auth = new AuthStore();
    }
}
