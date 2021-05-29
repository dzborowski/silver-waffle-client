import * as React from "react";
import {AvailableGamesList} from "./AvailableGamesList";
import {GameCreator} from "./GameCreator";

export class AvailableGamesCockpit extends React.Component {
    public render() {
        return (
            <div className={"AvailableGamesCockpit"}>
                <GameCreator />
                <AvailableGamesList />
            </div>
        );
    }
}
