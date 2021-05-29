import * as React from "react";
import {UserGamesList} from "./UserGamesList";

export class UserGamesCockpit extends React.Component {
    public render() {
        return (
            <div className={"UserGamesCockpit"}>
                <UserGamesList />
            </div>
        );
    }
}
