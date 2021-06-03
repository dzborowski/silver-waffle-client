import * as React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import "./Header.scss";
import {observer} from "mobx-react";
import {AppModel} from "../../AppModel";
import {NotificationUtil} from "../../core/notifications/NotificationUtil";

@observer
export class Header extends React.Component {
    protected getLoggedInUserAvailableActions(): React.ReactNode {
        const loggedUser = AppModel.rootStore.auth.loggedUser;
        return (
            <NavDropdown title={`${loggedUser?.firstName} ${loggedUser?.lastName}`} id="collasible-nav-dropdown">
                <NavDropdown.Item
                    onClick={() => {
                        AppModel.rootStore.auth.logout();
                        AppModel.history.push("/login");
                        NotificationUtil.success({message: "Logout successfully!"});
                    }}
                >
                    Logout
                </NavDropdown.Item>
            </NavDropdown>
        );
    }

    protected getLoggedOutUserAvailableActions(): React.ReactNode {
        return (
            <NavDropdown title="Account" id="collasible-nav-dropdown">
                <NavDropdown.Item
                    onClick={() => {
                        AppModel.history.push("/login");
                    }}
                >
                    Sign in
                </NavDropdown.Item>
                <NavDropdown.Item
                    onClick={() => {
                        AppModel.history.push("/register");
                    }}
                >
                    Sign up
                </NavDropdown.Item>
            </NavDropdown>
        );
    }

    public render() {
        return (
            <div className={"Header"}>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink to={"/my-games"} className={"menu-link"}>
                                My games
                            </NavLink>
                            <NavLink to={"/available-games"} className={"menu-link"}>
                                Available games
                            </NavLink>
                        </Nav>
                        <Nav>
                            {AppModel.rootStore.auth.isLoggedIn
                                ? this.getLoggedInUserAvailableActions()
                                : this.getLoggedOutUserAvailableActions()}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}
