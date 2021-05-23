import * as React from "react";
import {AvailableGamesList} from "./AvailableGamesList";
import {GameCreator} from "./GameCreator";

export class GameManagementPanel extends React.Component {
    public render() {
        return (
            <div className={"GameManagementPanel"}>
                <GameCreator />
                <AvailableGamesList />
            </div>
        );
    }
}
