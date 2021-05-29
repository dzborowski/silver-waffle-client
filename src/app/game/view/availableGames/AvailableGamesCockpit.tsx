import * as React from "react";
import {AvailableGamesList} from "./AvailableGamesList";
import {GameCreator} from "./GameCreator";
import "./AvailableGamesCockpit.scss";

export class AvailableGamesCockpit extends React.Component {
    public render() {
        return (
            <div className={"AvailableGamesCockpit"}>
                <GameCreator />
                <hr />
                <AvailableGamesList />
            </div>
        );
    }
}
