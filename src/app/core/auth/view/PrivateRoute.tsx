import * as React from "react";
import {observer} from "mobx-react";
import {Redirect, Route, RouteProps} from "react-router-dom";
import {AppModel} from "../../../AppModel";

@observer
export class PrivateRoute extends React.Component<RouteProps> {
    public render() {
        const {children, ...rest} = this.props;
        return (
            <Route
                {...rest}
                render={({location}) => {
                    return AppModel.rootStore.auth.isLoggedIn ? (
                        children
                    ) : (
                        <Redirect
                            push={true}
                            to={{
                                pathname: "/login",
                                state: {from: location},
                            }}
                        />
                    );
                }}
            />
        );
    }
}
